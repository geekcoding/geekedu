<?php
namespace Site\CommonBundle\Model;

class Navigate extends \Hmvc\Model
{
	protected function init()
    {
    	$this->rp = $this->dm->getRepository('SiteCommonBundle:Navigate');
    }
    public function getList()
    {
    	$navs = $this->rp->findAllByOrder();
    	return $navs;
    }
}
