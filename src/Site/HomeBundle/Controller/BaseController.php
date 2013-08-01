<?php

namespace Site\HomeBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Site\CoreBundle\Interclass\Controller as CoreController;
class BaseController extends CoreController{
	public $HomeModel;
	public $NavigateModel;
	public $LessonVideoModel;
	public $LessonTypeModel;
	public $LessonModel;
	public $UserLib;
	public function initialize(Request $request)
	{
		$this->HomeModel = $this->getModel()->get('SiteHomeBundle:Home');
		$this->NavigateModel = $this->getModel()->get('SiteHomeBundle:Navigate');
		$this->LessonVideoModel = $this->getModel()->get('SiteLessonBundle:Video');
		$this->LessonTypeModel = $this->getModel()->get('SiteLessonBundle:Type');
		$this->LessonModel = $this->getModel()->get('SiteLessonBundle:Lesson');
	}
}