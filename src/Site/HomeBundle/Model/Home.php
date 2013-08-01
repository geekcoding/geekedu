<?php
namespace Site\HomeBundle\Model;
use Site\CoreBundle\Interclass\Model as BaseModel;
class Home extends BaseModel
{
    public function getShow()
    {
    	return $this->rp->findOneBy(array('show' => true));
    }
}
