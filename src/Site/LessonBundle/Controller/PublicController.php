<?php

namespace Site\LessonBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Site\LessonBundle\Controller\BaseController as BaseController;

class PublicController extends BaseController
{
    public function getSubTypesAction()
    {
        $data['subtypes'] = $this->LessonTypeModel->getGradeTypes(1);
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

