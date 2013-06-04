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
                'name' => 'HTML5+CSS3+Js编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周一，三，五更新一集',
                'order' => 1,
                'type' => 'webui',
                'level' => 'base'
            ),
            array(
                'name' => 'Bootstrap实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每日更新一集',
                'order' => 3,
                'type' => 'webui',
                'level' => 'advence'
            ),
            array(
                'name' => 'Jquery编程实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每日更新一集',
                'order' => 2,
                'type' => 'webui',
                'level' => 'advence'
            ),
            array(
                'name' => 'Fundation框架设计经典',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周五更新两集',
                'order' => 4,
                'type' => 'webui',
                'level' => 'master'
            ),
            array(
                'name' => '社交网络UI设计实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 5,
                'type' => 'webui',
                'level' => 'advence'
            ),
            array(
                'name' => 'PHP编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周一，三，五更新一集',
                'order' => 1,
                'type' => 'php',
                'level' => 'base'
            ),
            array(
                'name' => 'Codeigniter快速开发',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每日更新一集',
                'order' => 2,
                'type' => 'php',
                'level' => 'base'
            ),
            array(
                'name' => '构建MVC框架编写实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每日更新一集',
                'order' => 3,
                'type' => 'php',
                'level' => 'advence'
            ),
            array(
                'name' => 'Silex框架编程经典',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周五更新两集',
                'order' => 4,
                'type' => 'php',
                'level' => 'master'
            ),
            array(
                'name' => 'Symfony2编程经典',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 5,
                'type' => 'php',
                'level' => 'master'
            ),
            array(
                'name' => 'PHP电子商务网站实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 6,
                'type' => 'php',
                'level' => 'advence'
            ),
            array(
                'name' => 'Ruby编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'type' => 'ruby',
                'level' => 'base'
            ),
            array(
                'name' => 'Rails敏捷开发实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'type' => 'ruby',
                'level' => 'advence'
            ),
            array(
                'name' => 'RubyMotion与Rubymac实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 4,
                'type' => 'ruby',
                'level' => 'advence'
            ),
            array(
                'name' => 'Rails社交网络实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 3,
                'type' => 'ruby',
                'level' => 'advence'
            ),
            array(
                'name' => 'Python编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'type' => 'python',
                'level' => 'base'
            ),
            array(
                'name' => 'Django框架开发实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'type' => 'python',
                'level' => 'advence'
            ),
            array(
                'name' => 'Python游戏开发实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 3,
                'type' => 'python',
                'level' => 'advence'
            ),
            array(
                'name' => 'Python Shell实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 4,
                'type' => 'python',
                'level' => 'advence'
            ),
            array(
                'name' => 'Python科学计算经典',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 5,
                'type' => 'python',
                'level' => 'master'
            ),
            array(
                'name' => 'Nodejs入门基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'type' => 'nodejs',
                'level' => 'base'
            ),
            array(
                'name' => 'Express框架实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'type' => 'nodejs',
                'level' => 'advence'
            ),
            array(
                'name' => 'Ojective-C编程基础',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'type' => 'ios',
                'level' => 'base'
            ),
            array(
                'name' => 'Jquery Mobile实战',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 1,
                'type' => 'mobilehtml5',
                'level' => 'advence'
            ),
            array(
                'name' => 'Sencha Touch+Phonegap移动开发经典',
                'price' => '0',
                'image' => 'uploads/images/lessons/test.jpeg',
                'uptime' => '每周四更新一集',
                'order' => 2,
                'type' => 'mobilehtml5',
                'level' => 'master'
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
            $lesson->setLevel($this->getReference($value['level'].'level'));
            $lesson->setType($this->getReference($value['type'].'type'));
            $manager->persist($lesson);
            $manager->flush();
        }
        if ($key == count($lessons)-1) {
            $this->addReference('lesson', $lesson);
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