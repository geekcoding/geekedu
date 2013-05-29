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
    protected $rp;
    public function __construct($dm)
    {
        $this->dm = $dm;
        $this->init();
    }
   abstract protected function init();
}

?>
