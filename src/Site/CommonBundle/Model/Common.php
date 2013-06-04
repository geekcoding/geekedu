<?php
namespace Site\CommonBundle\Model;

class Common extends \Hmvc\Model
{
	protected function init()
    {
    	$this->rp = $this->dm->getRepository('SiteCommonBundle:Common');
    }
    public function getShow()
    {
    	return $this->rp->findOneBy(array('show' => true));
    }
}
