<?php

namespace Site\LessonBundle\Controller;

use Site\LessonBundle\Controller\BaseController as BaseController;
use Symfony\Component\HttpFoundation\Request;

class LessonController extends BaseController
{
	public function indexAction($index){
		if($this->UserLib->checkLogin() == false){
			$this->setReferer($this->getRequest()->getUri());
			if($this->getReferer()){
				return $this->redirect($this->generateUrl('fos_user_security_login'));
			}
		}
		$lesson = $this->LessonModel->getOneShow($index);
		$data = array('lesson' => $lesson);
		return $this->render('SiteLessonBundle:Lesson:index.html.twig',$data);
	}
}