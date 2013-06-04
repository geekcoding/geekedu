<?php

namespace Site\CommonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\Response;
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
            'types' => $this->getLessonTypes(),
            'lessons' => $this->get('model')->load('Site:LessonBundle:Lesson')->getList()
     	);
        if($request->isXmlHttpRequest()){
            return $this->render('SiteCommonBundle:Default:index_content.html.twig',$data);
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
    /**
     * 获取所有课程分类
     * @return array
     */
    public function getLessonTypes()
    {
        $otypes = $this->get('model')->load('Site:LessonBundle:Type')->getList();;
        $types = array();
        foreach ($otypes as $key => $value) {
            if (count(explode('-',$value->getPath())) == 2) {
                $types[] = $value;
            }
        }
        foreach ($types as $key => $value) {
            $types[$key]->children = $this->getChindrenTypes($otypes,$value);
        }
        return $types;
    }
    /**
     * 获取课程分类的子分类
     * @param array $otypes
     * @param object $ptype
     * @return array
     */
    public function getChindrenTypes($otypes,$ptype)
    {
        $ctypes = array();
        foreach ($otypes as $k => $v) {
            $cpath = explode("-",$v->getPath());
            if(count($cpath) == 3 && $cpath[0].'-'.$cpath[1] == $ptype->getPath()){
                $ctypes[] = $v;
            }
        }
        return $ctypes;
    }
}
