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
            '<h3>采用极客的思维编写程序</h3><small>
            <p>编程为一种好奇性的探索所产生的爱好，生就兴趣，并非其它(与求职，加薪，创业等无关)。</p>
            <p>在这里你将学习到各种极客思维下的编程及其它IT技术，现在就开始？</p>
            </small>'
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