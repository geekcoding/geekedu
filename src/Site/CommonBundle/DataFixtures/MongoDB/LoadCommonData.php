<?php 
namespace Site\CommonBundle\DataFixtures\MongoDB;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Site\CommonBundle\Document\Common;

class LoadCommonData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $common = new Common();
        $common->setTitle('极客编码');
        $common->setMeta('PHP视频,Ruby视频,Rails视频');
        $common->setDescription('极客编码是国内最领先的编程实战技术在线教育平台');
        $common->setHomeblock(
            '<h3>编程的源自于创造性的思维--极客编码</h3>
            <p><small>无论您处于任何阶段,现在就让我们帮助您进入极客的编程境界吧!</small></p>
            '
        );
        $common->setHomeVideo('/uploads/videos/echo-hereweare.mp4');
        $common->setHomeImg('/uploads/videos/echo-hereweare.jpg');
        $common->setShow(true);
        $manager->persist($common);
        $manager->flush();
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