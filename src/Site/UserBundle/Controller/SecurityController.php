<?php
namespace Site\UserBundle\Controller;

use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;
use FOS\UserBundle\Controller\SecurityController  as BaseController;

class SecurityController extends BaseController
{
    protected function renderLogin(array $data)
    {
        $requestAttributes = $this->container->get('request')->attributes;
        if ($requestAttributes->get('_route') == 'admin_login') {
            $template = 'AdminUserBundle:Security:login.html.twig';
        } else {
            $template = 'SiteUserBundle:Security:login.html.twig';
        }
        return $this->container->get('templating')->renderResponse($template, $data);
    }
}
