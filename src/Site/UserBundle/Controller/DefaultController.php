<?php

namespace Site\UserBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Site\CoreBundle\Interclass\Controller as BaseController;
/**
 * 前台公共控制器
 */
class DefaultController extends BaseController
{
	// public function indexAction(){
	// 	$user = $this->getUser();
	// 	if($user == null){
	// 		return $this->redirect($this->generateUrl('fos_user_security_login'));
	// 	}
 //     	if($user->getEmail() == '' || $user->getPassword() == ''){
 //     		return $this->forward('SiteUserBundle:Oauth:index',array('user' => $user));
 //     	}else{
 //     		if(!$this->getReferer()){
 //     			return $this->render('SiteUserBundle:Default:index.html.twig');
 //     		}else{
 //     			$url = $this->getReferer();
 //     			$this->removeReferer();
 //     			return $this->redirect($url);
 //     		}
 //     	}
	// }
     public function indexAction($step,$type)
     {
          if($this->handle($step,$type) === true)
          {
               return $this->checkReferer();
          }else{
               return $this->handle($step,$type);
          }
     }
     public function checkReferer()
     {
          if(!$this->getReferer()){
               return $this->render('SiteUserBundle:Default:index.html.twig');
          }else{
                 $url = $this->getReferer();
               $this->removeReferer();
               return $this->redirect($url);
          }
     }
     public function handle($step,$type)
     {
          $handle = $this->get('site_user.handle.step');
          $result = $handle->handle($step,$type);
          if($result['handle'] == 'render')
          {
               return $this->render($result['view'],$result['data']);
          }else if($result['handle'] == 'redirect'){
               return $this->redirect($result['uri']);
          }else if($result['handle'] == 'result'){
               return $result['result'];
          }
     }
}