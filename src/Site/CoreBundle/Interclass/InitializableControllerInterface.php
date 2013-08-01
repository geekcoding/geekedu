<?php
 
namespace Site\CoreBundle\Interclass;
 
use Symfony\Component\HttpFoundation\Request;

interface InitializableControllerInterface
{
    public function initialize(Request $request);
}