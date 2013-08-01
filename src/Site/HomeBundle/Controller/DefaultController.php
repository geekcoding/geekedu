<?php

namespace Site\HomeBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Site\HomeBundle\Controller\BaseController as BaseController;
/**
 * 前台公共控制器
 */
class DefaultController extends BaseController
{
    /**
     * 首页控制器
     * @return string
     */
    public function indexAction(Request $request)
    {
    	$data = array(
            'home' => $this->HomeModel->getShow(),
            'newvideos' => $this->LessonVideoModel->getPublicList(12),
            'types' => $this->LessonTypeModel->getAllTypes(),
            'lessons' => $this->LessonModel->getAllByLearn()
     	);
        return $this->render('SiteHomeBundle:Default:index.html.twig',$data);
    }

    public function newVideoAction(Request $request)
    {
        if($request->query->get('id') && $request->isXmlHttpRequest())
        {
            $id = $request->query->get('id');
            $data['video'] = $this->LessonVideoModel->getPublicOne($id);
            return $this->render('SiteHomeBundle:Default:videowindow.html.twig',$data);
        }else{
            return new Response('加载错误请重试');
        }
    }
}
