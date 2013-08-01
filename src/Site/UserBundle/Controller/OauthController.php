<?php

namespace Site\UserBundle\Controller;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Site\UserBundle\Form\Type\OauthCreateFormType;
use Site\CoreBundle\Interclass\Controller as BaseController;

class OauthController extends BaseController{
	public function indexAction(Request $request)
	{
		$userlib = $this->getLibrary()->get('SiteUserBundle:User');
		$create_errors = '';
		if($this->getUser()){
			$formcreate = $this->getCreateForm($this->getUser());
			if($request->isMethod('POST')){
				$formcreate->handleRequest($request);
                if ($formcreate->isValid()) {
                    $data = $formcreate->getData();
                }else{
                	$create_errors = $this->get('validator')->validate($formcreate->getData(), array('SiteRegistration','Registration'));
                }
			}
		}else{
			return $this->redirect($this->generateUrl('fos_user_security_login'));
		}
		return $this->render('SiteUserBundle:Oauth:index.html.twig',array(
			'create_form' => $formcreate->createView(),
			'create_errors' => $create_errors,
			'bind_data' => $this->getBindForm()
		));
	}
	private function getCreateForm($sessionuser)
	{
		$request = $this->getRequest();
		$userManager = $this->container->get('fos_user.user_manager');
		$user = $userManager->createUser();
        $user->setEnabled(true);
        $user->setUsername($sessionuser->getUsername());
        $user->setEmail($sessionuser->getEmail());
        $form = $this->createForm(new OauthCreateFormType(),$user);
		$form->setData($user);
		return $form;
	}
	private function getBindForm()
	{
		$request = $this->getRequest();
		$session = $this->getSession();
		if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } elseif (null !== $session && $session->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = '';
        }
        if ($error) {
            $error = $error->getMessage();
        }
        $lastUsername = (null === $session) ? '' : $session->get(SecurityContext::LAST_USERNAME);

        $csrfToken = $this->container->has('form.csrf_provider')
            ? $this->container->get('form.csrf_provider')->generateCsrfToken('authenticate')
            : null;
         return array(
            'last_username' => $lastUsername,
            'error'         => $error,
            'csrf_token' => $csrfToken,
        );
	}
}