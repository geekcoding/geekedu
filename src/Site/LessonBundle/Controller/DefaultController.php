<?php
namespace Site\LessonBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Site\LessonBundle\Controller\BaseController as BaseController;

class DefaultController extends BaseController
{
    public function indexAction($index,$page,Request $request){
        $data_index = ($index == 'all') ? null:$index;
        $page = ($page == null) ? 1 : $page;
        $limit = 12;
        $page_start = ($page-1)*$limit;
        $data['lessons'] = $this->LessonModel->getListByType($data_index,$page_start,$limit);
        $data['page_count'] = ceil(count($data['lessons'])/$limit);
        $data['lesson_route'] = $request->get('_route');
        $data['lesson_index'] = $index;
        $data['current_page'] = $page;
        return $this->render('SiteLessonBundle:Default:index.html.twig',$data);
    }
    public function paginationAction($page_count,$page = 1,$lesson_route,$index,Request $request){
        $data = array(
            'page_count' => $page_count,
            'page' => $page,
            'lesson_route' => $lesson_route,
            'index' => $index
        );
        return $this->render('SiteLessonBundle:Default:pagination.html.twig',$data);
    }
}