<?php

namespace Hmvc;

class ModelLoad
{

    public $dm;
    public $container;

    public function __construct($dm,$container)
    {
        $this->dm = $dm;
        $this->container = $container;
        return $this;
    }
    public function load($modelname)
    {
        $model_arr = explode(":", $modelname);
        array_splice($model_arr, -1, 0, array('Model'));
        $model = implode("\\", $model_arr);
        if (class_exists($model))
        {
            return new $model($this->dm,$this->container);
        } else
        {
            throw new \Exception("The Model Not Exit,Please check The Code");
        }
    }

}