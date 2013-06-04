<?php

namespace Admin\GlobalBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
    	$data['bread'] = "首页";
        return $this->render('AdminGlobalBundle:Default:index.html.twig',$data);
    }
}
