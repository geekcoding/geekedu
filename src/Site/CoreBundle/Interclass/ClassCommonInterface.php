<?php
namespace Site\CoreBundle\Interclass;
use Symfony\Component\HttpFoundation\Request;
interface ClassCommonInterface{
	public function getTools();
	public function getModel();
	public function getLibrary();
	public function setReferer($referer);
	public function getReferer();
	public function removeReferer();
	public function setHttpReferer($referer);
	public function getHttpReferer();
	public function getSession();
}