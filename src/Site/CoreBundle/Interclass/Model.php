<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Model
 *
 * @author lichnow
 */
namespace Site\CoreBundle\Interclass;
use Site\CoreBundle\Interclass\ClassCommon;
abstract class Model extends ClassCommon
{
    public $dm;
    protected $rp = null;
    public function init($dm = null){
        $this->dm = $dm;
        $this->getCurrentRp();
        parent::init();
    }
    protected function getRp($rpname){
        return $this->dm->getRepository($rpname);
    }
    private function getCurrentRp(){
        if($this->rp == null){
            $model_class = get_called_class();
            $model_arr = explode('\\',$model_class);
            if(class_exists($model_arr[0].'\\'.$model_arr[1].'\\Repository\\'.$model_arr[count($model_arr)-1].'Repository')){
                $this->rp = $this->getRp($model_arr[0].$model_arr[1].':'.$model_arr[count($model_arr)-1]);
            }
        }
    }
}

?>
