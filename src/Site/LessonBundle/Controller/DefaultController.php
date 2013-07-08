<?php
namespace Site\LessonBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function indexAction($index,$page,Request $request){
        $data_index = ($index == 'all') ? null:$index;
        $page = ($page == null) ? 1 : $page;
        $limit = 12;
        $page_start = ($page-1)*$limit;
        $data['lessons'] = $this->get('model')->load('Site:LessonBundle:Lesson')
        ->getListByType($data_index,$page_start,$limit);
        $data['page_count'] = ceil(count($data['lessons'])/$limit);
        $data['lesson_route'] = $request->get('_route');
        $data['lesson_index'] = $index;
        $data['current_page'] = $page;
        if(!$request->request->get('content') && $request->request->get('slide') == true){
            $html = $this->renderView('SiteLessonBundle:Default:index_content.html.twig',$data);
            $data = array_merge($data,array('html' => $html));
            $response = new JsonResponse($data);
            return $response;
        }else if($request->request->get('content') == 'home' && $request->request->get('slide') == true){
            $html = $this->renderView('SiteLessonBundle:Default:home.html.twig',$data);
            $data = array_merge($data,array('html' => $html));
            $response = new JsonResponse($data);
            return $response;
        }else{
            return $this->render('SiteLessonBundle:Default:index.html.twig',$data);
        }
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