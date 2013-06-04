<?php

namespace Hmvc;

class ModelLoad
{

    public $dm;

    public function __construct($dm)
    {
        $this->dm = $dm;
        return $this;
    }
    public function load($modelname)
    {
        $model_arr = explode(":", $modelname);
        array_splice($model_arr, -1, 0, array('Model'));
        $model = implode("\\", $model_arr);
        if (class_exists($model))
        {
            return new $model($this->dm);
        } else
        {
            throw new \Exception("The Model Not Exit,Please check The Code");
        }
    }

}