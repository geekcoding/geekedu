<?php 
namespace Site\CommonBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Site\CommonBundle\Document\Navigate;

class LoadNavigateData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $navs = array(
            array(
                'name' => '课程',
                'link' => '/lesson',
                'tip' => '开始学习任何你喜欢的课程,你将成为真正的GEEK',
                'icon' => 'icon-facetime-video',
                'order' => 1
            ),
            array(
                'name' => '问答',
                'link' => '#',
                'tip' => '遇到麻烦?在这里提问,我们会跟你最佳的回答',
                'icon' => 'icon-question-sign',
                'order' => 2
            ),
            array(
                'name' => '文档',
                'link' => '#',
                'tip' => '太多的英文文档看着头大?这里有我们翻译的最新中文文档',
                'icon' => 'icon-th-list',
                'order' => 3,
                'type' => 'webui',
                'level' => 'base'
            ),
            array(
                'name' => '社区',
                'link' => '#',
                'tip' => '无聊了吧?枯燥了吧?来这里和同学们交流分享任何你的喜欢的吧',
                'icon' => 'icon-comment',
                'order' => 4
            ),
            array(
                'name' => '开源',
                'link' => 'http://open.geekcoding.net',
                'tip' => '很多东西不是必须的但是还是必需的,来这里可以下载到也许你正在找的',
                'icon' => 'icon-github-sign',
                'order' => 5,
                'blank' => true
            ),
        );
        $this->insertData($manager,$navs);
    }

    protected function insertData($manager,$navs)
    {
        foreach ($navs as $key => $value) {
            $nav = new Navigate();
            $nav->setName($value['name']);
            $nav->setLink($value['link']);
            $nav->setTip($value['tip']);
            $nav->setIcon($value['icon']);
            $nav->setOrder($value['order']);
            if(isset($value['blank']))
                $nav->setBlank($value['blank']);
            $manager->persist($nav);
            $manager->flush();
        }
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 1;
    }
}
 ?>