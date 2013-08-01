<?php
namespace Site\UserBundle\Library;
use Symfony\Component\Security\Core\SecurityContext;
use Site\UserBundle\Form\Type\OauthCreateFormType;
use Site\CoreBundle\Interclass\Library;
class User extends Library{
	public function checkLogin()
	{
		$islogin = ($this->getUser() == null) ? false : true;
		return $islogin;
	}
	public function OauthCreateForm($sessionuser)
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
	public function OauthBindForm()
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