<?php

/*
 * This file is part of the HWIOAuthBundle package.
 *
 * (c) Hardware.Info <opensource@hardware.info>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Site\UserBundle\Oauth\Provider;

use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use Site\UserBundle\Oauth\User\OAuthUser;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthAwareUserProviderInterface;

/**
 * OAuthUserProvider
 *
 * @author Geoffrey Bachelet <geoffrey.bachelet@gmail.com>
 */
class OAuthUserProvider implements UserProviderInterface, OAuthAwareUserProviderInterface
{

    private $user = null;

    public function createUser(){
        $this->user = new OAuthUser();
        return $this->user;
    }
    public function updateUser(&$user){
        $user = $this->loadUserByUsername($user->getUsername());
    }
    /**
     * {@inheritDoc}
     */
    public function loadUserByUsername($username)
    {
       if($this->user != null){
            $this->user->setUsername($username);
            return $this->user; 
       }
       $user = new OAuthUser();
       $user->setUsername($username);
       return $user;
    }

    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        return $this->loadUserByUsername($response->getNickname());
    }

    /**
     * {@inheritDoc}
     */
    public function refreshUser(UserInterface $user)
    {
        if (!$this->supportsClass(get_class($user))) {
            throw new UnsupportedUserException(sprintf('Unsupported user class "%s"', get_class($user)));
        }

        return $this->loadUserByUsername($user->getUsername());
    }

    /**
     * {@inheritDoc}
     */
    public function supportsClass($class)
    {
        return $class === 'Site\\UserBundle\\Oauth\\User\\OAuthUser';
    }
}
