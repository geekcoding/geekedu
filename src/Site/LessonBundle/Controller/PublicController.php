<?php

namespace Site\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PublicController extends Controller
{
    public function sidebarAction()
    {
    	$data['lesson_types'] = $this->getTypes();
        return $this->render('SiteLessonBundle:Public:sidebar.html.twig',$data);
    }
    public function getTypes()
    {
        $otypes = $this->get('doctrine_mongodb')
        ->getManager()
        ->getRepository('SiteLessonBundle:Type')
        ->findAllByOrder();
        $types = array();
        foreach ($otypes as $key => $value) {
        	if ($value->getPath() == "0") {
        		$types[] = $value;
        	}
        }
        foreach ($types as $key => $value) {
        	$types[$key]->children = $this->getChindrenTypes($otypes,$value);
        }
        return $types;
    }
    public function getChindrenTypes($otypes,$ptype)
    {
    	$ctypes = array();
    	foreach ($otypes as $k => $v) {
        	$cpath = explode("-",$v->getPath());
        	if(count($cpath) == 2 && $cpath[1] == $ptype->getId()){
        		$ctypes[] = $v;
        	}
        }
        return $ctypes;
    }
}

