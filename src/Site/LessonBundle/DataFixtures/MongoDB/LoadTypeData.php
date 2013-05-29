<?php 
namespace Site\LessonBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Site\LessonBundle\Document\Type;

class LoadTypeData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $types = array(
            array(
                'name' => 'web/桌面',
                'order' => 1,
                'path' => '0-1'
            ),
            array(
                'name' => '移动开发',
                'order' => 2,
                'path' => '0-2'
            ),
            array(
                'name' => '底层开发',
                'order' => 3,
                'path' => '0-3'
            ),
            array(
                'name' => '系统工具',
                'order' => 4,
                'path' => '0-4'
            ),
            array(
                'name' => '前端课程',
                'order' => 1,
                'path' => '0-1-1',
                'index' => 'webui'
            ),
            array(
                'name' => 'PHP课程',
                'order' => 2,
                'path' => '0-1-2',
                'index' => 'php'
            ),
            array(
                'name' => 'Ruby课程',
                'order' => 3,
                'path' => '0-1-3',
                'index' => 'ruby'
            ),
            array(
                'name' => 'Python课程',
                'order' => 4,
                'path' => '0-1-4',
                'index' => 'python'
            ),
            array(
                'name' => 'Nodejs课程',
                'order' => 5,
                'path' => '0-1-5',
                'index' => 'nodejs'
            ),
            array(
                'name' => 'IOS编程课程',
                'order' => 2,
                'path' => '0-2-1',
                'index' => 'ios'
            ),
            array(
                'name' => 'Android课程',
                'order' => 3,
                'path' => '0-2',
                'index' => 'android'
            ),
            array(
                'name' => 'WinPhone课程',
                'order' => 4,
                'path' => '0-2-2',
                'index' => 'winphone'
            ),
            array(
                'name' => '移动Html5课程',
                'order' => 1,
                'path' => '0-2-3',
                'index' => 'mobilehtml5'
            ),
            array(
                'name' => 'C/C++课程',
                'order' => 1,
                'path' => '0-3-1',
                'index' => 'ccpp'
            ),
            array(
                'name' => 'Lisp/Lua课程',
                'order' => 2,
                'path' => '0-3-2',
                'index' => 'lisplua'
            ),
            array(
                'name' => 'Linux系统课程',
                'order' => 1,
                'path' => '0-4-1',
                'index' => 'linux'
            ),
            array(
                'name' => '开源程序课程',
                'order' => 2,
                'path' => '0-4-2',
                'index' => 'opensource'
            )
        );
        $this->insertData($manager,$types);
    }

    protected function insertData($manager,$types)
    {
        foreach ($types as $key => $value) {
            $type = new Type();
            $type->setName($value['name']);
            $type->setOrder($value['order']);
            $type->setPath($value['path']);
            $manager->persist($type);
            $manager->flush();
            if ($key > 3) {
                $this->addReference($value['index'].'type', $type);
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 2;
    }
}
 ?>