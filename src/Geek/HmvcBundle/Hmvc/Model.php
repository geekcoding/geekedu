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
namespace Hmvc;

abstract class Model
{
    public $dm;
    public $container;
    protected $rp;
    public function __construct($dm,$container)
    {
        $this->dm = $dm;
        $this->container = $container;
        $this->init();
    }
   abstract protected function init();
}

?>
