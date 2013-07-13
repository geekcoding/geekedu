<?php 
namespace Site\LessonBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Site\LessonBundle\Document\Lesson;

class LoadLessonData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $lessons = array(
            array(
                'name' => 'HTML5编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/html5.jpeg',
                'uptime' => '每周一，三，五更新一集',
                'order' => 1,
                'description' => 'HTML5是用于取代1999年所制定的 HTML 4.01 和 XHTML 1.0 标准的 HTML 标准版本，现在仍处于发展阶段，但大部分浏览器已经支持某些 HTML5 技术。HTML 5有两大特点：首先，强化了 Web 网页的表现性能。其次，追加了本地数据库等 Web 应用的功能。广义论及HTML5时，实际指的是包括HTML、CSS和JavaScript在内的一套技术组合。它希望能够减少浏览器对于需要插件的丰富性网络应用服务（plug-in-based rich internet application，RIA)，如Adobe Flash、Microsoft Silverlight，与Oracle JavaFX的需求，并且提供更多能有效增强网络应用的标准集。',
                'type' => 'webui',
                'level' => 'base',
                'learn' => 2000,
                'index' => 'html5'
            ),
            array(
                'name' => 'Bootstrap实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/bootstrap.jpeg',
                'uptime' => '每日更新一集',
                'order' => 3,
                'description' => 'Bootstrap是Twitter推出的一个开源的用于前端开发的工具包。它由Twitter的设计师Mark Otto和Jacob Thornton合作开发，是一个CSS/HTML框架。Bootstrap提供了优雅的HTML和CSS规范，它即是由动态CSS语言Less写成。Bootstrap一经推出后颇受欢迎，一直是GitHub上的热门开源项目，包括NASA的MSNBC（微软全国广播公司）的Breaking News都使用了该项目。',
                'type' => 'webui',
                'level' => 'advence',
                'learn' => 300,
                'index' => 'bootstrap'
            ),
            array(
                'name' => 'Jquery编程实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/jquery.jpeg',
                'uptime' => '每日更新一集',
                'order' => 2,
                'description' => 'Jquery是继prototype之后又一个优秀的Javascript框架。它是轻量级的js库 ，它兼容CSS3，还兼容各种浏览器（IE 6.0+, FF 1.5+, Safari 2.0+, Opera 9.0+），jQuery2.0及后续版本将不再支持IE6/7/8浏览器。jQuery使用户能更方便地处理HTML documents、events、实现动画效果，并且方便地为网站提供AJAX交互。jQuery还有一个比较大的优势是，它的文档说明很全，而且各种应用也说得很详细，同时还有许多成熟的插件可供选择。jQuery能够使用户的html页面保持代码和html内容分离，也就是说，不用再在html里面插入一堆js来调用命令了，只需定义id即可。',
                'type' => 'webui',
                'level' => 'advence',
                'learn' => 800,
                'index' => 'jquery'
            ),
            array(
                'name' => 'Fundation框架实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/foundation.jpg',
                'uptime' => '每周五更新两集',
                'order' => 4,
                'description' => 'Foundation 是一个易用、强大而且灵活的框架，用于构建基于任何设备上的 Web 应用。提供多种 Web 上的 UI 组件，如表单、按钮、Tabs 等等。',
                'type' => 'webui',
                'level' => 'master',
                'learn' => 100,
                'index' => 'foundation'
            ),
            array(
                'name' => '社交网络UI设计实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 5,
                'description' => '在我们的生活，工作，学习过程中，社交网络已经逐渐成为未来互联网发展的趋势。今年，Facebook,Twitter,Google+都是时下社交网络的热门产品，每月的用户使用量都在逐渐增多。',
                'type' => 'webui',
                'level' => 'advence',
                'learn' => 2,
                'index' => 'facebookui'
            ),
            array(
                'name' => 'Angularjs框架实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/angularjs.jpg',
                'uptime' => '每周五更新两集',
                'order' => 4,
                'description' => 'AngularJS是为了克服HTML在构建应用上的不足而设计的。HTML是一门很好的为静态文本展示设计的声明式语言，但要构建WEB应用的话它就显得乏力了。所以我做了一些工作（你也可以觉得是小花招）来让浏览器做我想要的事。',
                'type' => 'javascript',
                'level' => 'master',
                'learn' => 100,
                'index' => 'angularjs'
            ),
            array(
                'name' => 'Nodejs入门基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/nodejs.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'description' => 'Node.js是一套用来编写高性能网络服务器的JavaScript工具包，一系列的变化由此开始。比较独特的是，Node.js会假设在POSIX环境下运行Linux 或 Mac OS X。如果是在Windows下，那就需要安装MinGW以获得一个仿POSIX的环境。在Node中，Http是首要的。Node为创建http服务器作了优化，所以在网上看到的大部分示例和库都是集中在web上(http框架、模板库等）。',
                'type' => 'javascript',
                'level' => 'base',
                'learn' => 1000,
                'index' => 'nodejs'
            ),
            array(
                'name' => 'Express框架实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/express.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'description' => 'Express 是一个简洁而灵活的 node.js Web应用框架, 提供一系列强大特性帮助你创建各种Web应用。',
                'type' => 'javascript',
                'level' => 'advence',
                'learn' => 200,
                'index' => 'express'
            ),
            array(
                'name' => 'PHP编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/php.jpeg',
                'uptime' => '每周一，三，五更新一集',
                'order' => 1,
                'description' => 'PHP，是英文超文本预处理语言Hypertext Preprocessor的缩写。PHP 是一种 HTML 内嵌式的语言，是一种在服务器端执行的嵌入HTML文档的脚本语言，语言的风格有类似于C语言，被广泛地运用。',
                'type' => 'php',
                'level' => 'base',
                'learn' => 3000,
                'index' => 'php'
            ),
            array(
                'name' => '构建MVC框架编写实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/php-mvc.jpg',
                'uptime' => '每日更新一集',
                'order' => 2,
                'description' => 'MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用于组织代码用一种业务逻辑和数据显示分离的方法，这个方法的假设前提是如果业务逻辑被聚集到一个部件里面，而且界面和用户围绕数据的交互能被改进和个性化定制而不需要重新编写业务逻辑MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。',
                'type' => 'php',
                'level' => 'advence',
                'learn' => 200,
                'index' => 'mvcdev'
            ),
            array(
                'name' => 'Silex框架开发',
                'price' => '0',
                'image' => 'uploads/images/lessons/silex.jpg',
                'uptime' => '每周五更新两集',
                'order' => 3,
                'description' => 'Silex 是一个PHP 5.3的微型框架。基于Symfony2 和 Pimple 构建。同时还受到sinatra的启发。',
                'type' => 'php',
                'level' => 'master',
                'learn' => 20,
                'index' => 'silex'
            ),
            array(
                'name' => 'Laravel框架开发',
                'price' => '0',
                'image' => 'uploads/images/lessons/laravel.jpg',
                'uptime' => '每日更新一集',
                'order' => 4,
                'description' => 'Laravel 是一个简单优雅的 PHP WEB 开发框架，将你从意大利面条式的代码中解放出来。通过简单、高雅、表达式语法开发出很棒的 WEB应用!开发应该是一个创造性的过程, 让你你享受，而不是让你很痛苦的事情。Laravel让你享受新鲜的空气。',
                'type' => 'php',
                'level' => 'base',
                'learn' => 300,
                'index' => 'laravel'
            ),
            array(
                'name' => 'Symfony2框架开发',
                'price' => '0',
                'image' => 'uploads/images/lessons/symfony.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 5,
                'description' => '你正在评估、学习或者使用Symfony吗？和你一样，我们被Symfony框架对开发效率、代码健壮性的追求所吸引，受益之余，发起Symfony开发者中文社区项目，并邀请你的加入。你一定会有收获——这并不是来自我们的承诺，因为任何成功的开源项目，都与投身其中的开发者共同进步。算你一个？',
                'type' => 'php',
                'level' => 'master',
                'learn' => 800,
                'index' => 'symfony2'
            ),
            array(
                'name' => 'PHP电子商务网站实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 6,
                'description' => '电子商务通常是指是在全球各地广泛的商业贸易活动中，在因特网开放的网络环境下，基于浏览器/服务器应用方式，买卖双方不谋面地进行各种商贸活动，实现消费者的网上购物、商户之间的网上交易和在线电子支付以及各种商务活动、交易活动、金融活动和相关的综合服务活动的一种新型的商业运营模式。电子商务是利用微电脑技术和网络通讯技术进行的商务活动。各国政府、学者、企业界人士根据自己所处的地位和对电子商务参与的角度和程度的不同，给出了许多不同的定义。',
                'type' => 'php',
                'level' => 'advence',
                'learn' => 100,
                'index' => 'phpecommon'
            ),
            array(
                'name' => 'Ruby编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/ruby.jpg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'description' => '主要讲解HTML5以及CSS3,Javascript等web编程基础知识,本课程学完后即可掌握开发静态web站点相关的技术。',
                'type' => 'ruby',
                'level' => 'base',
                'learn' => 1000,
                'index' => 'ruby'
            ),
            array(
                'name' => 'Rails敏捷开发实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/rails.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'description' => '主要讲解HTML5以及CSS3,Javascript等web编程基础知识,本课程学完后即可掌握开发静态web站点相关的技术。',
                'type' => 'ruby',
                'level' => 'advence',
                'learn' => 1300,
                'index' => 'rails'
            ),
            array(
                'name' => 'Rails社交网络实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 3,
                'description' => '主要讲解HTML5以及CSS3,Javascript等web编程基础知识,本课程学完后即可掌握开发静态web站点相关的技术。',
                'type' => 'ruby',
                'level' => 'advence',
                'learn' => 100,
                'index' => 'railssocial'
            ),
            array(
                'name' => 'Ojective-C编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/objective-c.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'description' => '主要讲解HTML5以及CSS3,Javascript等web编程基础知识,本课程学完后即可掌握开发静态web站点相关的技术。',
                'type' => 'ios',
                'level' => 'base',
                'learn' => 200,
                'index' => 'objective-c'
            ),
            array(
                'name' => 'Jquery Mobile实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/jquery-mobile.png',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'description' => '主要讲解HTML5以及CSS3,Javascript等web编程基础知识,本课程学完后即可掌握开发静态web站点相关的技术。',
                'type' => 'mobilehtml5',
                'level' => 'advence',
                'learn' => 300,
                'index' => 'jquery-mobile'
            ),
            array(
                'name' => 'Sencha Touch移动开发',
                'price' => '0',
                'image' => 'uploads/images/lessons/sencha_touch.png',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'description' => '主要讲解HTML5以及CSS3,Javascript等web编程基础知识,本课程学完后即可掌握开发静态web站点相关的技术。',
                'type' => 'mobilehtml5',
                'level' => 'master',
                'learn' => 100,
                'index' => 'sencha-touch'
            ),
            array(
                'name' => 'Linux服务器实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/linuxserver.jpg',
                'uptime' => '每周四更新一集',
                'order' => 4,
                'description' => 'Linux 是一种类UNIX 计算机操作系统，最早开始于一位名叫Linus Torvalds的计算机业余爱好者，当时他是芬兰赫尔辛基大学的学生。他的目的是想设计一个代替Minix（是由一位名叫Andrew Tannebaum的计算机教授编写的一个操作系统示教程序）的操作系统，这个操作系统可用于386、486或奔腾处理器的个人计算机上，并且具有Unix操作系统的全部功能。',
                'type' => 'linux',
                'level' => 'advence',
                'learn' => 3,
                'index' => 'linuxserver'
            )
        );
        $this->insertData($manager,$lessons);
    }

    protected function insertData($manager,$lessons)
    {
        foreach ($lessons as $key => $value) {
            $lesson = new Lesson();
            $lesson->setName($value['name']);
            $lesson->setPrice($value['price']);
            $lesson->setImage($value['image']);
            $lesson->setUptime($value['uptime']);
            $lesson->setOrder($value['order']);
            $lesson->setDescription($value['description']);
            $lesson->setLearn($value['learn']);
            $lesson->setLevel($this->getReference($value['level'].'level'));
            $lesson->setType($this->getReference($value['type'].'type'));
            $manager->persist($lesson);
            $manager->flush();
            $this->addReference($value['index'].'lesson', $lesson);
        }
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 3;
    }
}
 ?>