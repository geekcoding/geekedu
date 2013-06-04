<?php
namespace Admin\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupController extends Controller
{
    public function groupListAction()
    {
    	$data['bread'] = "首页";
        $data['users'] = $this->container->get('fos_user.user_manager')->findUsers();
        $data['groups'] = $this->container->get('fos_user.group_manager')->findGroups();
        return $this->render('AdminUserBundle:Group:groupList.html.twig',$data);
    }
    /**
     * 添加用户组
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function groupAddAction(Request $request)
    {
        if($request->isXmlHttpRequest()){
            $data = array('result' => false);
            $groupManager = $this->container->get('fos_user.group_manager');
            if($request->request->get('groupname')){
                $group = $groupManager->createGroup('');
                $group->setName($request->request->get('groupname'));
                $roles = $request->request->get('roles');
                if(!empty($roles)){
                    $group->setRoles($roles);
                }
                $groupManager->updateGroup($group,true);
                $data['group'] = array(
                    'id' => $group->getId(),
                    'name' => $group->getName(),
                    'usercount' => 4,
                    'roles' => $group->getroles()
                );
                $data['result'] = true;
            }
            $response = new Response(json_encode($data));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    	$data['roles'] = $this->getRolesList();
    	return $this->render('AdminUserBundle:Group:groupAdd.html.twig',$data);
    }
    /**
     * 编辑用户组
     * @param type $id
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @return \Symfony\Component\HttpFoundation\Response
     * @throws type
     */
    public function groupEditAction($id,Request $request){
        $data = array('result' => false);
        $groupManager = $this->container->get('fos_user.group_manager');
        if(isset($id) && $id != ""){
            $group = $groupManager->findGroupby(array('id' => $id));
            if(!$group && !$request->isXmlHttpRequest()){
                throw $this->createNotFoundException('不存在ID为'.$id.'的用户组');
            }elseif (!$group && $request->isXmlHttpRequest()) {
                $data['error'] = '不存在ID为'.$id.'的用户组';
            }else{
                if($request->isXmlHttpRequest() && $request->getMethod() == 'POST'){
                    $group = $groupManager->findGroupby(array('id' => $id));
                    $group->setName($request->request->get('groupname'));
                    $group->setRoles($request->request->get('roles'));
                    $groupManager->updateGroup($group,true);
                    $data['result'] = true;
                }
                $data['group'] = array(
                    'id' => $group->getid(),
                    'name' => $group->getName(),
                    'usercount' => 4,
                    'roles' => $group->getRoles()
                );
            }
            $response = new Response(json_encode($data));
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
    }
    /**
     * 删除用户组
     * @param type $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function groupDelAction($id){
        $data = array('result' => false);
        if(isset($id) && $id != ""){
            $groupManager = $this->container->get('fos_user.group_manager');
            $group = $groupManager->findGroupby(array('id' => $id));
            if($group){
                $groupManager->deleteGroup($group);
                $data = array('result' => true,'id' => $id);
            }
        }
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    public function getRolesList(){
        return array_merge($this->container->getParameter('security.role_hierarchy.roles'));
    }
}