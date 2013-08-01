<?php
namespace Site\UserBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Site\CoreBundle\Interclass\RestfulController as BaseController;
/**
 * @Route(service="site_user.restful")
 */
class RestfulController extends BaseController{
	/**
     * @Route("/checklogin.json",options={"expose"=true})
     */
    public function checkLoginAction()
	{
		if($this->getRequest()->request->get('referer') && $this->getRequest()->request->get('url')){
			$url = $this->getRequest()->request->get('url');
			$this->setReferer($url);
		}
		$result = $this->getLibrary()->get('SiteUserBundle:User')->checkLogin();
		return $this->jsonResult(array('result' => $result));
    }
	/**
     * @Route("/checkrole")
     */
	public function checkRoleAction($role = 'ROLE_USER')
	{
		$hasrole = $this->container->get('security.context')->isGranted($role);
		$data = array('role_result' => $hasrole);
		if($this->container->get('request')->isXmlHttpRequest()){
			return $this->jsonResult($data);
		}
		return $this->httpResult($data);
	}
	/**
     * @Route("/checkunique.json",options={"expose"=true})
     */
	public function checkUniqueAction(Request $request)
    {
        if($request->isXmlHttpRequest() && 'POST' == $request->getMethod()){
            if($request->request->get('name') && !$request->request->get('email')){
                $user = $this->container->get('fos_user.user_manager')
                    ->findUserByUsername($request->request->get('name'));
                if(count($user) == 1){
                    $result = false; 
                }else{
                    $result = true;
                }
            }
            if(!$request->request->get('name') && $request->request->get('email')){
                $user = $this->container->get('fos_user.user_manager')
                    ->findUserByEmail($request->request->get('email'));
                if(count($user) == 1){
                    $result = false; 
                }else{
                    $result = true;
                }
            }
            $response = new JsonResponse($result);
            return $response;
        }
    }
}