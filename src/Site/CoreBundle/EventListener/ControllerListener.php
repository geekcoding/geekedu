<?php
 
namespace Site\CoreBundle\EventListener;
 
use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpFoundation\Session\Session;
use Site\CoreBundle\Interclass\InitializableControllerInterface;
 
class ControllerListener
{
    public function onKernelController(FilterControllerEvent $event)
    {
        $session = new Session();
        if($session->isStarted() == true){
            $session->start();
        } 
        $controller = $event->getController();
 
        if (!is_array($controller)) {
            return;
        }
 
        $controllerObject = $controller[0];
 
        if ($controllerObject instanceof ExceptionController) {
            return;
        }
 
        if ($controllerObject instanceof InitializableControllerInterface) {

            $controllerObject->initialize($event->getRequest());
        }
    }
}