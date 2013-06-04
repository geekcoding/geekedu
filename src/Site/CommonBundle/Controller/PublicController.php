<?php

namespace Site\CommonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class PublicController extends Controller
{
	public function headerAction()
	{
		$data = array(
            'common' => $this->get('model')->load('Site:CommonBundle:Common')->getShow(),
            'navigates' => $this->get('model')->load('Site:CommonBundle:Navigate')->getList()
     	);
		return $this->render('SiteCommonBundle:Public:header.html.twig',$data);
	}
	public function footerAction()
	{
		return $this->render('SiteCommonBundle:Public:footer.html.twig');
	}
	public function localAction(Array $local){
		return $this->render('SiteCommonBundle:Public:local.html.twig',array('local' => $local));
	}
}