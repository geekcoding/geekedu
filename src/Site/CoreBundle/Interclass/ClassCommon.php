<?php
namespace Site\CoreBundle\Interclass;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\Bundle\DoctrineBundle\Registry;
abstract class ClassCommon implements ClassCommonInterface{
	public $container;
    public $init_param = array();
    public function __construct($container){
        $this->container = $container;
    }
    public function init(){
        if(method_exists($this, 'initialize')){
            call_user_func_array( array( &$this , 'initialize' ) , $init_param);
        }
    }
	public function getTools(){
        return $this->get('tools');
    }
    public function getModel(){
    	return $this->getTools()->model;
    }
    public function getLibrary(){
        return $this->getTools()->library;
    }
    public function getSession(){
        return $this->getRequest()->getSession();
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
    public function generateUrl($route, $parameters = array(), $referenceType = UrlGeneratorInterface::ABSOLUTE_PATH)
    {
        return $this->container->get('router')->generate($route, $parameters, $referenceType);
    }
    public function getRequest()
    {
        return $this->container->get('request');
    }
    public function getDoctrine()
    {
        if (!$this->container->has('doctrine')) {
            throw new \LogicException('The DoctrineBundle is not registered in your application.');
        }

        return $this->container->get('doctrine');
    }
    public function getUser()
    {
        if (!$this->container->has('security.context')) {
            throw new \LogicException('The SecurityBundle is not registered in your application.');
        }

        if (null === $token = $this->container->get('security.context')->getToken()) {
            return null;
        }

        if (!is_object($user = $token->getUser())) {
            return null;
        }

        return $user;
    }
    public function has($id)
    {
        return $this->container->has($id);
    }
    public function get($id)
    {
        return $this->container->get($id);
    }
}