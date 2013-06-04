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

}


?>
