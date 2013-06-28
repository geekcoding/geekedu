<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of LessonType
 *
 * @author lichnow
 */
namespace Site\LessonBundle\Model;

class Type extends \Hmvc\Model
{

    protected function init()
    {
    	$this->rp = $this->dm->getRepository('SiteLessonBundle:Type');
    }
    public function getList()
    {
         $lessontypes = $this->rp->findAllByOrder();
         return $lessontypes;
    }
    public function getOneByRname($rname){
        $lessonType = $this->rp->findOneByRname($rname);
        return $lessonType;
    }
    public function getAllTypes(){
    	$otypes = $this->getList();
    	$types = array();
        foreach ($otypes as $key => $value) {
            if (count(explode('-',$value->getPath())) == 2) {
                $types[] = $value;
            }
        }
        foreach ($types as $key => $value) {
            $types[$key]->children = $this->getChindrenTypes($otypes,$value);
        }
        return $types;
    }
    public function getChindrenTypes($otypes,$ptype){
    	$ctypes = array();
        foreach ($otypes as $k => $v) {
            $cpath = explode("-",$v->getPath());
            if(count($cpath) == 3 && $cpath[0].'-'.$cpath[1] == $ptype->getPath()){
                $ctypes[] = $v;
            }
        }
        return $ctypes;
    }
    public function getGradeTypes($grade = 0){
    	switch ($grade) {
    		case 0:
    			return $this->getParTypes();
    			break;
    		case 1:
    		    return $this->getSubTypes();
    		default:
    			return $this->getParTypes();
    			break;
    	}
    }
    protected function getParTypes(){
    	$otypes = $this->getList();
    	$types = array();
        foreach ($otypes as $key => $value) {
            if (count(explode('-',$value->getPath())) == 2) {
                $types[] = $value;
            }
        }
        return $types;
    }
    protected function getSubTypes(){
    	$otypes = $this->getList();
    	$types = array();
        foreach ($otypes as $key => $value) {
            if (count(explode('-',$value->getPath())) == 3) {
                $types[] = $value;
            }
        }
        return $types;
    }

}


?>
