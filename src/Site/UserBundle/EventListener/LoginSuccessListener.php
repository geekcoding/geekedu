<?php
namespace Site\UserBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class LoginSuccessListener implements EventSubscriberInterface
{
	private $router;

    public function __construct(UrlGeneratorInterface $router)
    {
        $this->router = $router;
    }

    /**
     * {@inheritDoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::SECURITY_IMPLICIT_LOGIN => 'onLoginSuccess',
        );
    }

    public function onLoginSuccess(FormEvent $event)
    {
        $url = $this->router->generate('site_common_homepage');

        $event->setResponse(new RedirectResponse($url));
    }
}