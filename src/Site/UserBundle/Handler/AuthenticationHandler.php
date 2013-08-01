<?php
namespace Site\UserBundle\Handler;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface as Container;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

class AuthenticationHandler
implements AuthenticationSuccessHandlerInterface,
           AuthenticationFailureHandlerInterface
{
    private $router;
    private $container;

    public function __construct(Router $router,Container $container)
    {
        $this->router = $router;
        $this->container = $container;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token)
    {
        $url = $this->container->get('request')->getSession()->get('referer');
        if(!$url || $url == ''){
            $url = $this->container->get('router')->generate('site_user_homepage');
        }
        $this->container->get('request')->getSession()->remove('referer');
        if ($request->isXmlHttpRequest() && 'POST' == $request->getMethod()) {
            $response = new Response(json_encode(array('result' => true,'url' => $url)));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        } else {
            return new RedirectResponse($url);
        }
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        if ($request->isXmlHttpRequest() && 'POST' == $request->getMethod()) {
            $response = new Response(json_encode(array('result' => false,
                'error' => $this->container->get('translator')->trans($exception->getMessage(),array(),'FOSUserBundle')
            )));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        } else {
            $request->getSession()->set(SecurityContextInterface::AUTHENTICATION_ERROR, $exception);
            $url = $this->router->generate('fos_user_security_login');

            return new RedirectResponse($url);
        }
    }
}