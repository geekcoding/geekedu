<?php

namespace Site\CommonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
/**
 * 前台公共控制器
 */
class DefaultController extends Controller
{
    /**
     * 首页控制器
     * @return string
     */
    public function indexAction(Request $request)
    {
    	$data = array(
            'common' => $this->get('model')->load('Site:CommonBundle:Common')->getShow(),
            'newvideos' => $this->get('model')->load('Site:LessonBundle:Video')->getPublicList(12),
            'types' => $this->get('model')->load('Site:LessonBundle:Type')->getAllTypes(),
            'lessons' => $this->get('model')->load('Site:LessonBundle:Lesson')->getAll()
     	);
        if($request->request->get('slide') == true){
            $html = $this->renderView('SiteCommonBundle:Default:index_content.html.twig',$data);
            $response = new JsonResponse(array('html' => $html));
            return $response;
        }
        return $this->render('SiteCommonBundle:Default:index.html.twig',$data);
    }

    public function newVideoAction(Request $request)
    {
        if($request->query->get('id') && $request->isXmlHttpRequest())
        {
            $id = $request->query->get('id');
            $data['video'] = $this->get('model')->load('Site:LessonBundle:Video')->getPublicOne($id);
            return $this->render('SiteCommonBundle:Default:newvideo.html.twig',$data);
        }else{
            return new Response('加载错误请重试');
        }
    }
}
