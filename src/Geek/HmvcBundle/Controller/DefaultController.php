<?php

namespace Geek\HmvcBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('GeekHmvcBundle:Default:index.html.twig', array('name' => $name));
    }
}
