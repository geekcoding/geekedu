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
    public function getList()
    {
         $lessons = $this->rp->findAllByOrder();
         return $lessons;
    }

}

?>
