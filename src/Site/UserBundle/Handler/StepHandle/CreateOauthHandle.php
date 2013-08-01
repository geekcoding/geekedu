<?php
namespace Site\UserBundle\Handler\StepHandle;
use Site\UserBundle\Form\Type\OauthCreateFormType;
use Symfony\Component\HttpFoundation\Response;
use Site\CoreBundle\Interclass\ClassCommon as BaseClass;

class CreateOauthHandle extends BaseClass
{
	public function handle()
	{
		$sessionuser = $this->getUser();
		$request = $this->getRequest();
		if($sessionuser)
		{
			if($sessionuser->getEmail() == '' || $sessionuser->getPassword() == '')
			{
				$form = $this->getForm($sessionuser);
				$errors = '';
				$form->handleRequest($request);
				if($request->isMethod('POST')){
					if ($form->isValid()) {
                        $newuser = $form->getData();
                    }else{
                	    $errors = $this->get('validator')->validate($form->getData(), array('SiteRegistration','Registration'));
                    }
				}
				return array(
					'handle' => 'render',
					'view' => 'SiteUserBundle:Oauth:index.html.twig',
					'data' => array(
			            'form' => $form->createView(),
			            'errors' => $errors
		            )
		        );
			}else{
				return array('handle' => 'result','result' => true);
			}
		}else{
			return array('handle' => 'redirect','uri' => $this->generateUrl('fos_user_security_login'));
		}
	}
	public function getForm($sessionuser)
	{
		$request = $this->getRequest();
		$userManager = $this->container->get('fos_user.user_manager');
		$user = $userManager->createUser();
        $user->setEnabled(true);
        $user->setUsername($sessionuser->getUsername());
        $user->setEmail($sessionuser->getEmail());
        $form = $this->container->get('form.factory')->create(new OauthCreateFormType(),$user);
		$form->setData($user);
		return $form;
	}
}