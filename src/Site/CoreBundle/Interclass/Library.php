<?php
namespace Site\CoreBundle\Interclass;
use Symfony\Component\DependencyInjection\Container;
abstract class Library extends ClassCommon{
	public $init_param = array();
	public function getErrorMessages(\Symfony\Component\Form\Form $form) {      
        $errors = array();
        $has_errors = false;
        if ($form->count() > 0) {
            foreach ($form->all() as $child) {
                if (!$child->isValid()) {
                    $messages = $this->getErrorMessages($child);
                    if(!empty($messages)){
                        $errors[$child->getName()] = $messages;
                        $has_errors = true;
                    }
                }
            }
        } else {
            foreach ($form->getErrors() as $key => $error) {
                $errors[] = $error->getMessage();
                $has_errors = true;
            }
        }
        if($has_errors == false){
            return array();
        }
        return $errors;
    }
}