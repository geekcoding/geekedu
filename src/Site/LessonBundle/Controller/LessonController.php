<?php

namespace Site\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class LessonController extends Controller
{
	public function indexAction($index,$content,Request $request){
		if($index == 'all'){
			$data['lessons'] = $this->get('model')->load('Site:LessonBundle:Lesson')->getList();
		}else{
			$data['lessons'] = $this->get('model')->load('Site:LessonBundle:Lesson')->getListByType($index);
		}
		if($content == true || $request->request->get('slide') == true){
			return $this->render('SiteLessonBundle:Lesson:index_content.html.twig',$data);
		}
		return $this->render('SiteLessonBundle:Lesson:index.html.twig',$data);
	}
}