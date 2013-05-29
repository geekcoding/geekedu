<?php

namespace Site\ForumBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('SiteForumBundle:Default:index.html.twig', array('name' => $name));
    }
}
