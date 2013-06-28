<?php
namespace Site\UserBundle\Controller;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Event\UserEvent;
use Symfony\Component\HttpFoundation\Response;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use FOS\UserBundle\Model\UserInterface;
use FOS\UserBundle\Controller\RegistrationController as BaseController;

class RegistrationController extends BaseController
{
    public function registerAction()
    {
        $form = $this->container->get('fos_user.registration.form');
        $formHandler = $this->container->get('fos_user.registration.form.handler');
        $confirmationEnabled = $this->container->getParameter('fos_user.registration.confirmation.enabled');
        $process = $formHandler->process($confirmationEnabled);
        if ($process) {
            $user = $form->getData();
            $authUser = false;
            if ($confirmationEnabled) {
                $this->container->get('session')->set('fos_user_send_confirmation_email/email', $user->getEmail());
                $route = 'fos_user_registration_check_email';
            } else {
                $authUser = true;
                $route = 'fos_user_registration_confirmed';
            }

            $this->setFlash('fos_user_success', 'registration.flash.user_created');
            $url = $this->container->get('router')->generate($route);
            if ($authUser) {
                $this->authenticateUser($user, $response);
            }
            $request = new Request();
            if ($formHandler->isAjax()) {
                $response = new Response(json_encode(array('result' => true,'url' => $url)));
                $response->headers->set('Content-Type', 'application/json');
            }else{
                $response = new RedirectResponse($url);
            }
            return $response;
        }
        if($this->container->get('request')->request->get('slide') == true){
            return $this->container->get('templating')
            ->renderResponse('SiteUserBundle:Registration:register_content.html.twig', array(
                'form' => $form->createView(),
            ));
        }else{
            return $this->container->get('templating')->renderResponse('SiteUserBundle:Registration:register.html.twig', array(
                'form' => $form->createView(),
            ));
        }
    }
    public function checkUniqueAction(Request $request)
    {
        if($request->isXmlHttpRequest() && 'POST' == $request->getMethod()){
            if($request->request->get('name') && !$request->request->get('email')){
                $user = $this->container->get('fos_user.user_manager')
                    ->findUserByUsername($request->request->get('name'));
                if(count($user) == 1){
                    $result = false; 
                }else{
                    $result = true;
                }
            }
            if(!$request->request->get('name') && $request->request->get('email')){
                $user = $this->container->get('fos_user.user_manager')
                    ->findUserByEmail($request->request->get('email'));
                if(count($user) == 1){
                    $result = false; 
                }else{
                    $result = true;
                }
            }
            $response = new Response(json_encode($result));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }
    public function checkEmailAction()
    {
        $email = $this->container->get('session')->get('fos_user_send_confirmation_email/email');
        $this->container->get('session')->remove('fos_user_send_confirmation_email/email');
        $user = $this->container->get('fos_user.user_manager')->findUserByEmail($email);

        if (null === $user) {
            throw new NotFoundHttpException(sprintf('The user with email "%s" does not exist', $email));
        }

        if($this->container->get('request')->get('slide') == true){
            return $this->container->get('templating')->renderResponse('SiteUserBundle:Registration:checkEmail_content.html.twig', array(
                'user' => $user,
            ));
        }else{
            return $this->container->get('templating')->renderResponse('SiteUserBundle:Registration:checkEmail.html.twig', array(
                'user' => $user,
            ));
        }  
    }

    public function confirmedAction()
    {
        $user = $this->container->get('security.context')->getToken()->getUser();
        if (!is_object($user) || !$user instanceof UserInterface) {
            throw new AccessDeniedException('This user does not have access to this section.');
        }
        if($this->container->get('request')->get('slide') == true){
            return $this->container->get('templating')->renderResponse('FOSUserBundle:Registration:confirmed_content.html.'.$this->getEngine(), array(
                'user' => $user,
            )); 
        }
        return $this->container->get('templating')->renderResponse('FOSUserBundle:Registration:confirmed.html.'.$this->getEngine(), array(
            'user' => $user,
        ));
    }
    // public function confirmAction($token)
    // {
    //     $user = $this->container->get('fos_user.user_manager')->findUserByConfirmationToken($token);

    //     if (null === $user) {
    //         throw new NotFoundHttpException(sprintf('The user with confirmation token "%s" does not exist', $token));
    //     }

    //     $user->setConfirmationToken(null);
    //     $user->setEnabled(true);
    //     $user->setLastLogin(new \DateTime());

    //     $this->container->get('fos_user.user_manager')->updateUser($user);
    //     $response = new RedirectResponse($this->container->get('router')->generate('fos_user_registration_confirmed'));
    //     $this->authenticateUser($user, $response);

    //     return $response;
    // }
}
