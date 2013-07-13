<?php 
namespace Site\LessonBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Site\LessonBundle\Document\Video;

class LoadVideoData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $videos = array(
            array(
                'title' => 'Symfony2安装及环境搭建',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'symfony2'
            ),
            array(
                'title' => 'Rails3安装及环境搭建',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'rails'
            ),
            array(
                'title' => 'Silex安装及环境搭建',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'silex'
            ),
            array(
                'title' => 'Bootstrap使用初步',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'bootstrap'
            ),
            array(
                'title' => 'Nginx+PHP+Rails服务器搭建',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'linuxserver'
            ),
            array(
                'title' => 'Symfony2架构详解',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'symfony2'
            ),
            array(
                'title' => 'Laravel4初步',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'laravel'
            ),
            array(
                'title' => '各种PHP优化程序',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'php'
            ),
            array(
                'title' => 'Foundation框架使用初步',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'foundation'
            ),
            array(
                'title' => 'Bootstrap中使用LESS设计',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'bootstrap'
            ),
            array(
                'title' => 'Symfony2+Mongodb实现',
                'order' => 0,
                'playtimes' => 0,
                'downpath' => 'uploads/videos/home/homevideo.mov',
                'imgpath' => 'uploads/videos/home/homeimg.jpg',
                'public' => true,
                'ctime' => new \DateTime(),
                'lesson' => 'symfony2'
            )
        );
        $this->insertData($manager,$videos);
    }

    protected function insertData($manager,$videos)
    {
        foreach ($videos as $key => $value) {
            $video = new Video();
            $video->setTitle($value['title']);
            $video->setOrder($value['order']);
            $video->setPlaytimes($value['playtimes']);
            $video->setDownpath($value['downpath']);
            $video->setImgpath($value['imgpath']);
            $video->setCtime($value['ctime']);
            $video->setPublic($value['public']);
            $video->setLesson($this->getReference($value['lesson'].'lesson'));
            $manager->persist($video);
            $manager->flush();
        }
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 4;
    }
}
 ?>