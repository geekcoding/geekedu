<?php

/*
 * This file is part of the HWIOAuthBundle package.
 *
 * (c) Hardware.Info <opensource@hardware.info>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Site\UserBundle\Oauth\User;

use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Security\Core\User\UserInterface;

class OAuthUser implements UserInterface
{

    /**
     * @var string
     */
    protected $username;

    /**
     * @var string
     */
    protected $password = '';

    /**
     * @var string
     */
    protected $email = '';

    /**
     * @var string
     */
    protected $profilepicture = '';

    /**
     * @var boolean
     */
    protected $enabled = true;

    /**
     * @var string
     */
    protected $github_id;

    /**
     * @var string
     */
    protected $github_name;

    /**
     * @var string
     */
    protected $github_access_token;

    protected $session;

    public function __construct()
    {
        $this->session = new Session();
    }

    /**
     * {@inheritDoc}
     */
    public function getRoles()
    {
        return array('ROLE_USER', 'ROLE_OAUTH_USER');
    }

    /**
     * {@inheritDoc}
     */
    public function getSalt()
    {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * {@inheritDoc}
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * {@inheritDoc}
     */
    public function setPassword($password)
    {
        $this->password = $password;
        $this->session->set('tokens/password',$password);
    }

    /**
     * {@inheritDoc}
     */
    public function getPassword()
    {
        return $this->password == '' ? $this->session->get('tokens/password') : $this->password;
    }

    /**
     * {@inheritDoc}
     */
    public function setEmail($email)
    {
        $this->email = $email;
        $this->session->set('tokens/email',$email);
    }

    /**
     * {@inheritDoc}
     */
    public function getEmail()
    {
        return $this->email == '' ? $this->session->get('tokens/email') : $this->email;
    }

    /**
     * {@inheritDoc}
     */
    public function setProfilePicture($profilepicture)
    {
        $this->profilepicture = $profilepicture;
        $this->session->set('tokens/profilepicture',$profilepicture);
    }

    /**
     * {@inheritDoc}
     */
    public function getProfilePicture()
    {
        return $this->profilepicture == '' ? $this->session->get('tokens/profilepicture') : $this->profilepicture;
    }


    /**
     * {@inheritDoc}
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
        $this->session->set('tokens/enabled',$enabled);
    }

    /**
     * {@inheritDoc}
     */
    public function getEnabled(){
        return $this->enabled == '' ? $this->session->get('tokens/enabled') : $this->enabled;
    }

    /**
     * {@inheritDoc}
     */
    public function eraseCredentials()
    {
        return true;
    }

    /**
     * {@inheritDoc}
     */
    public function equals(UserInterface $user)
    {
        return $user->getUsername() === $this->username;
    }

    /**
     * {@inheritDoc}
     */
    public function setGithubId($github_id)
    {
        $this->email = $github_id;
        $this->session->set('tokens/github_id',$github_id);
    }

    /**
     * {@inheritDoc}
     */
    public function getGithubId()
    {
        return $this->github_id == null ? $this->session->get('tokens/github_id') : $this->github_id;
    }

    /**
     * {@inheritDoc}
     */
    public function setGithubName($github_name)
    {
        $this->github_name = $github_name;
        $this->session->set('tokens/github_name',$github_name);
    }

    /**
     * {@inheritDoc}
     */
    public function getGithubName()
    {
        return $this->github_name == null ? $this->session->get('tokens/github_name') : $this->github_name;
    }

    /**
     * {@inheritDoc}
     */
    public function setGithubAccessToken($github_access_token)
    {
        $this->github_access_token = $github_access_token;
        $this->session->set('tokens/github_access_token',$github_access_token);
    }

    /**
     * {@inheritDoc}
     */
    public function getGithubAccessToken($github_access_token)
    {
        return $this->github_access_token == null ? $this->session->get('tokens/github_access_token') : $this->github_access_token;
    }
}
