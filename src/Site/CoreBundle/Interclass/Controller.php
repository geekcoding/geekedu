<?php
 
namespace Site\CoreBundle\Interclass;
 
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller as SfController;
use Site\CoreBundle\Interclass\InitializableControllerInterface;
use Site\CoreBundle\Interclass\ClassCommonInterface;

abstract class Controller extends SfController implements InitializableControllerInterface,ClassCommonInterface
{
    public function initialize(Request $request){}
    public function getTools(){
        return $this->get('tools');
    }
    public function getModel(){
    	return $this->getTools()->model;
    }
    public function getLibrary(){
        return $this->getTools()->library;
    }
    public function setReferer($referer){
        $this->getSession()->set('referer',$referer);
    }
    public function getReferer(){
        return $this->getSession()->get('referer');
    }
    public function removeReferer(){
        $this->getSession()->remove('referer');
    }
    public function setHttpReferer($referer){
        $this->getRequest()->headers->set('Referer',$referer);
    }
    public function getHttpReferer(){
        return $this->getRequest()->headers->get('Referer');
    }
    public function getSession(){
        return $this->getRequest()->getSession();
    }
}