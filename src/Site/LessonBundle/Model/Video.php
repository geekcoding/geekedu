<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Video
 * @author lichnow
 */
namespace Site\LessonBundle\Model;
use Site\CoreBundle\Interclass\Model as BaseModel;
class Video extends BaseModel
{
    public function getList()
    {
         $videos = $this->rp->findAllOrderByCtime();
         return $videos;
    }
    public function getPublicList($limit)
    {
    	$publicvideos = $this->rp->findByPublic($limit);
    	return $publicvideos;
    }
    public function getPublicOne($id)
    {
        return $this->rp->findOneBy(array('id' => $id,'public' => true));
    }

}


?>
