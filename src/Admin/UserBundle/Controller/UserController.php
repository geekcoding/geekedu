<?php
namespace Admin\UserBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Admin\UserBundle\Form\Type\UserType;
use Site\UserBundle\Document\User;

class UserController extends Controller{
    
    public function userListAction(){
    	$data['bread'] = "首页";
        $data['users'] = $this->container->get('fos_user.user_manager')->findUsers();
        return $this->render('AdminUserBundle:User:userList.html.twig',$data);
    } 
    public function userAddAction(){
        $user = new User();
        $form = $this->createForm(new UserType,$user);
    	return $this->render('AdminUserBundle:User:userAdd.html.twig',array(
            'form' => $form->createView(),
        ));
    } 
    public function userDelAction($id){
    	return new Response('ddd');
    } 
    public function userEditAction($id){
    	return new Response('ddd');
    }
}