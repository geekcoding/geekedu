<?php

namespace Site\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class LessonController extends Controller
{
	public function indexAction($index,$content,Request $request){
		$data['lessons'] = $this->get('model')->load('Site:LessonBundle:Lesson')->getListByType($index);
		$data['lessons_page_count'] = ceil(count($data['lessons'])/10);
		if($content == 'home' && $request->request->get('slide') == true){
			return $this->render('SiteLessonBundle:Lesson:home.html.twig',$data);
		}else if($content == 'block' && $request->request->get('slide') == true){
			return $this->render('SiteLessonBundle:Lesson:block.html.twig',$data);
		}else{
			return $this->render('SiteLessonBundle:Lesson:index.html.twig',$data);
		}
	}
}