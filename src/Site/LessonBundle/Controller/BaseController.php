<?php

namespace Site\LessonBundle\Controller;
use Symfony\Component\HttpFoundation\Request;
use Site\CoreBundle\Interclass\Controller as CoreController;
class BaseController extends CoreController{
	public $LessonVideoModel;
	public $LessonTypeModel;
	public $LessonModel;
	public function initialize(Request $request)
	{
		$this->LessonVideoModel = $this->getModel()->get('SiteLessonBundle:Video');
		$this->LessonTypeModel = $this->getModel()->get('SiteLessonBundle:Type');
		$this->LessonModel = $this->getModel()->get('SiteLessonBundle:Lesson');
		$this->UserLib = $this->getLibrary()->get('SiteUserBundle:User');
	}
}