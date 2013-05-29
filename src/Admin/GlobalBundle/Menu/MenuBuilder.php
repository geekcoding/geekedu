<?php
namespace Admin\GlobalBundle\Menu;

use Knp\Menu\FactoryInterface;
use Symfony\Component\DependencyInjection\ContainerAware;
use Symfony\Component\HttpFoundation\Request;
use Knp\Menu\Matcher\Matcher;
use Knp\Menu\MenuFactory;
use Knp\Menu\Renderer\ListRenderer;

class MenuBuilder extends ContainerAware
{
    private $factory;

    /**
     * @param FactoryInterface $factory
     */
    public function __construct(FactoryInterface $factory)
    {
        $this->factory = $factory;
    }

    public function createSidebarMenu(Request $request)
    {
        $factory = new MenuFactory();
        $menu = $factory->createItem('root');

        $menu->addChild('home', array('uri' => '/admin','label' => '后台首页'))
        ->setAttribute('icon' , 'icomoon-icon-home-2');

        $menu->addChild('common', array('uri' => '#common','label' => '全局设置'))
        ->setAttribute('icon' , 'icomoon-icon-cog');

        /**
        *
        *用户管理菜单
        **/
        $menu->addChild('user', array('uri' => '#user','label' => '用户管理'))
        ->setAttribute('icon' , 'entypo-icon-users')->setChildrenAttribute('class', 'sub');
        $menu['user']->addChild('user-group', array('uri' => '/admin/user/group','label' => '用户组管理' ))
        ->setAttribute('icon' , 'icomoon-icon-users-2');
        $menu['user']->addChild('user-user', array('uri' => '/admin/user/user','label' => '用户管理' ))
        ->setAttribute('icon' , 'icomoon-icon-user');
        $menu['user']->addChild('user-role', array('uri' => '/admin/user/role','label' => '权限设置' ))
        ->setAttribute('icon' , 'icomoon-icon-cogs');

        $menu->addChild('lesson', array('uri' => '#lesson','label' => '课程管理'))
        ->setAttribute('icon' , 'icomoon-icon-camera-7')->setChildrenAttribute('class', 'sub');
        $menu['lesson']->addChild('lesson-type', array('uri' => '/admin/lesson/type','label' => '分类管理' ))
        ->setAttribute('icon' , 'minia-icon-list-4');
        $menu['lesson']->addChild('lesson-level', array('uri' => '/admin/lesson/level','label' => '级别管理' ))
        ->setAttribute('icon' , 'icomoon-icon-flip-2');
        $menu['lesson']->addChild('lesson-lesson', array('uri' => '/admin/lesson/lesson','label' => '课程管理' ))
        ->setAttribute('icon' , 'icomoon-icon-movie');
        $menu['lesson']->addChild('lesson-video', array('uri' => '/admin/lesson/video','label' => '课时管理' ))
        ->setAttribute('icon' , 'icomoon-icon-play');
        $menu['lesson']->addChild('lesson-tag', array('uri' => '/admin/lesson/tag','label' => '标签管理' ))
        ->setAttribute('icon' , 'icomoon-icon-tag-3');

        $renderer = new ListRenderer(new Matcher());
        return $menu;
    }
}