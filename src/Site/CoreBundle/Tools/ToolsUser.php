<?php
namespace Site\CoreBundle\Tools;
Abstract class ToolsUser{
	public $type;
	private $init_param = array();
	public $container;
	private $kernel;
	public function __construct($container){
		$this->container = $container;
		$this->kernel = $this->container->get('kernel');
	}
	public function getInitParam(){
		return $this->init_param;
	}
	public function setInitParam($init_param){
		$this->init_param = $init_param;
	}
	public function get($class){
		$classname = $this->getClassName($class);
		$obj = new $classname($this->container);
		if(method_exists($obj, 'init')){
			call_user_func_array( array( $obj , 'init' ),$this->getInitParam());
		}
		return $obj;
	}
	public function getClassName($class){
		if (2 != count($parts = explode(':', $class))) {
            throw new \InvalidArgumentException(sprintf('The "%s" '.ucfirst($this->type).' is not a valid "a:b:c" '.ucfirst($this->type).' string.', $class));
        }

        list($bundle, $class) = $parts;
        $class = str_replace('/', '\\', $class);
        $bundles = array();

        foreach ($this->kernel->getBundle($bundle, false) as $b) {
            $try = $b->getNamespace().'\\'.ucfirst($this->type).'\\'.$class;
            if (class_exists($try)) {
                return $try;
            }

            $bundles[] = $b->getName();
            $msg = sprintf('Unable to find '.ucfirst($this->type).' "%s:%s" - class "%s" does not exist.', $bundle, $class, $try);
        }

        if (count($bundles) > 1) {
            $msg = sprintf('Unable to find '.ucfirst($this->type).' "%s:%s" in bundles %s.', $bundle, $class, implode(', ', $bundles));
        }

        throw new \InvalidArgumentException($msg);
	}
}