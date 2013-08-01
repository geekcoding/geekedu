<?php
namespace Site\HomeBundle\Model;
use Site\CoreBundle\Interclass\Model as BaseModel;
class Navigate extends BaseModel
{
    public function getList()
    {
    	$navs = $this->rp->findAllByOrder();
    	return $navs;
    }
}
