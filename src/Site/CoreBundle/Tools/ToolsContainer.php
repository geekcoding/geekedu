<?php
namespace Site\CoreBundle\Tools;
use Symfony\Component\DependencyInjection\Exception\ServiceNotFoundException;
class ToolsContainer{
	private $container;
	private $prefix = 'core.';
	public function __construct($container){
		$this->container = $container;
	}
	public function setPrefix($prefix){
		$this->prefix = $prefix;
	}
	public function __get($tool_name){
		$tool_service = strtolower($this->prefix.'tools.'.$tool_name);
		if (!$this->container->has($tool_service)) {
            throw new ServiceNotFoundException($tool_service);
        }else{
        	$property = strtolower($tool_name);
            return $this->container->get($tool_service);
        }
	}
}