<?php

namespace Site\HomeBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Site\HomeBundle\Controller\BaseController as BaseController;

class PublicController extends BaseController
{
	public function baseInfoAction()
	{
		$data = array('baseinfo' => $this->HomeModel->getShow());
        return $this->render('SiteHomeBundle:Public:baseInfo.html.twig',$data);
	}
	public function headerAction()
	{
		$data = array(
			'home' => $this->HomeModel->getShow(),
            'navigates' => $this->NavigateModel->getList()
     	);
		return $this->render('SiteHomeBundle:Public:header.html.twig',$data);
	}
	public function footerAction()
	{
		return $this->render('SiteHomeBundle:Public:footer.html.twig');
	}
	public function localAction(Array $local){
		return $this->render('SiteHomeBundle:Public:local.html.twig',array('local' => $local));
	}
}