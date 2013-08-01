<?php
namespace Site\UserBundle\Handler;

use Site\CoreBundle\Interclass\ClassCommon as BaseClass;

class StepHandle extends BaseClass
{
	public function handle($step,$type)
	{
		switch ($step) {
			case 1:
				return $this->handleOne($type);
				break;
			
			default:
				return $this->handleOne($type);
				break;
		}
	}
	public function handleOne($type)
	{
		$service = 'site_user.handle.step.'.$type;
		return $this->get($service)->handle();
	}
}