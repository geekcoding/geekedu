<?php
namespace Site\CoreBundle\Interclass;
use Symfony\Component\HttpFoundation\JsonResponse;
use Site\CoreBundle\Interclass\ClassCommon;
abstract class RestfulController extends ClassCommon{
	public function jsonResult($data){
		return new JsonResponse($data);
	}
}