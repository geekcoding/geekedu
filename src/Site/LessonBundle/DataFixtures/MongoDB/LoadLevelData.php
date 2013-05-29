<?php 
namespace Site\LessonBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Site\LessonBundle\Document\Level;

class LoadLevelData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $levels = array(
            array(
                'name' => '基础类课程',
                'order' => 1,
                'index' => 'base'
            ),
            array(
                'name' => '高级类课程',
                'order' => 2,
                'index' => 'advence'
            ),
            array(
                'name' => '大师类课程',
                'order' => 3,
                'index' => 'master'
            )
        );
        $this->insertData($manager,$levels);
    }

    protected function insertData($manager,$levels)
    {
        foreach ($levels as $key => $value) {
            $level = new Level();
            $level->setName($value['name']);
            $manager->persist($level);
            $manager->flush();
            $this->addReference($value['index'].'level', $level);
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