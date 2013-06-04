<?php

namespace Site\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    public function indexAction(Request $request)
    {
    	$local = array(
			array(
			 'name' => "首页",
			 'href' => $this->generateUrl('site_common_homepage')
			),
			array('name' => '课程')
		);
    	$data = array(
    		'local' => $local,
    		'levels' => $this->getLevels(),
    		'lessons' => $this->getLessons()
    	);
        if($request->isXmlHttpRequest() && $request->request->get('slide') == true){
            return $this->render('SiteLessonBundle:Default:index_content.html.twig',$data);
        }
        return $this->render('SiteLessonBundle:Default:index.html.twig',$data);
    }
    protected function getLevels()
    {
    	return $this->get("doctrine_mongodb")
    	       ->getManager()
    	       ->getRepository("SiteLessonBundle:Level")
    	       ->findAllByOrder();
    }
    public function getLessons()
    {
        $lessons = $this->get('doctrine_mongodb')
        ->getManager()
        ->getRepository('SiteLessonBundle:Lesson')
        ->findAllByOrder();
        return $lessons;
    }
}
