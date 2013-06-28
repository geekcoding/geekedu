<?php

namespace Site\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PublicController extends Controller
{
    public function getSubTypesAction()
    {
        $data['subtypes'] = $this->get('model')->load('Site:LessonBundle:Type')->getGradeTypes(1);
        return $this->render('SiteLessonBundle:Public:subtypes.html.twig',$data);
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

