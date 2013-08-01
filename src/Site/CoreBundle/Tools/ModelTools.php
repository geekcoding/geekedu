<?php

namespace Site\CoreBundle\Tools;
use Site\CoreBundle\Tools\ToolsUser;
class ModelTools extends ToolsUser
{
    public $type = 'model';
    public function __construct($dm,$container)
    {
        $this->setInitParam(array('dm' => $dm));
        parent::__construct($container);
    }

}