<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Lesson
 *
 * @author lichnow
 */

namespace Site\LessonBundle\Model;

class Lesson extends \Hmvc\Model
{

    protected function init()
    {
    	$this->rp = $this->dm->getRepository('SiteLessonBundle:Lesson');
    }
    public function getAll()
    {
         $lessons = $this->rp->findAll();
         return $lessons;
    }
    public function getAllByLearn()
    {
        $lessons = $this->rp->findAllByLearn();
        return $lessons;
    }
    public function getList($skip = 0,$limit = 20){
        return $this->rp->findAllByOrder($skip,$limit);
    }
    public function getListByType($index,$skip = 0,$limit = 20)
    {
        if($index == null){
            return $this->getList($skip,$limit);
        }
        $type = $this->container->get('model')->load('Site:LessonBundle:Type')->getOneByRname($index);
    	$lessons = $this->rp->findLimitByType($type,$skip,$limit);
    	return $lessons;
    }

}

?>
