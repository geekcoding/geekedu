<?php
namespace Site\UserBundle\Oauth\Provider;

use HWI\Bundle\OAuthBundle\OAuth\Response\UserResponseInterface;
use HWI\Bundle\OAuthBundle\Security\Core\User\OAuthAwareUserProviderInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use FOS\UserBundle\Model\UserManagerInterface;
use Site\UserBundle\Oauth\User\OAuthUser;
use HWI\Bundle\OAuthBundle\Security\Core\User\FOSUBUserProvider as BaseClass;
 
class FOSUBUserProvider extends BaseClass
{

    private $container;
    private $oauthprovider;

    /**
     * Constructor.
     *
     * @param UserManagerInterface $userManager FOSUB user provider.
     * @param array                $properties  Property mapping.
     * @param ContainerInterface   $container.
     */
    public function __construct(UserManagerInterface $userManager, array $properties,UserProviderInterface $oauthprovider,ContainerInterface $container)
    {
        $this->container = $container;
        $this->userManager = $userManager;
        $this->properties  = $properties;
        $this->oauthprovider = $oauthprovider;
    }
 
    /**
     * {@inheritDoc}
     */
    public function connect($user, UserResponseInterface $response)
    {
        $property = $this->getProperty($response);
        $username = $response->getUsername();
        $nickname = $response->getNickname();
 
        $service = $response->getResourceOwner()->getName();
 
        $setter = 'set'.ucfirst($service);
        $setter_id = $setter.'Id';
        $setter_name = $setter.'Name';
        $setter_token = $setter.'AccessToken';
 
        if (null !== $previousUser = $this->userManager->findUserBy(array($property => $username))) {
            $previousUser->$setter_id(null);
            $previousUser->$setter_name(null);
            $previousUser->$setter_token(null);
            // $this->userManager->updateUser($previousUser);
        }
 
        $user->$setter_id($username);
        $user->$setter_name($nickname);
        $user->$setter_token($response->getAccessToken());
        // $this->userManager->updateUser($user);
    }
 
    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        $username = $response->getUsername();
        $nickname = $response->getNickname();
        $profilepicture = $response->getProfilePicture();
        $user = $this->userManager->findUserBy(array($this->getProperty($response) => $username));
        if (null === $user) {
            // $service = $response->getResourceOwner()->getName();
            // $setter = 'set'.ucfirst($service);
            // $setter_id = $setter.'Id';
            // $setter_name = $setter.'Name';
            // $setter_token = $setter.'AccessToken';
            // $user = $this->userManager->createUser();
            // $user->$setter_id($username);
            // $user->$setter_name($nickname);
            // $user->$setter_token($response->getAccessToken());
            // if($this->userManager->findUserBy(array('username' => $nickname)) !== null){
            //     $newname = $nickname.'_'.$this->createRandstr();
            //     while ($newname != $nickname) {
            //         $user->setUsername($newname);
            //     }
            // }else{
            //     $user->setUsername($nickname);
            // }
            // if($this->userManager->findUserBy(array('email' => $email)) === null){
            //     $user->setEmail($email);
            // }else{
            //     $user->setEmail('');
            // }
            // $user->setRoles(array('ROLE_USER'));
            // $user->setEnabled(true);
            // $this->userManager->updateUser($user);
            $user = $this->oauthprovider->createUser();
            $service = $response->getResourceOwner()->getName();
            $setter = 'set'.ucfirst($service);
            $setter_id = $setter.'Id';
            $setter_name = $setter.'Name';
            $setter_token = $setter.'AccessToken';
            $user->$setter_id($username);
            $user->$setter_name($nickname);
            $user->$setter_token($response->getAccessToken());
            if($this->userManager->findUserBy(array('username' => $nickname))){
                do{
                    $randname = $nickname.'_'.$this->createRandstr();
                    $user->setUsername($randname);
                }while ($this->userManager->findUserBy(array('username' => $randname)));
            }else{
                $user->setUsername($nickname);
            }
            if(!$this->userManager->findUserBy(array('email' => $response->getEmail()))){
                $email = $user->setEmail($response->getEmail());
            }
            $user->setProfilePicture($response->getEmail());
            $user->setEnabled(true);
            $this->oauthprovider->updateUser($user);
            return $user;
        }
 
        $user = parent::loadUserByOAuthUserResponse($response);
        $serviceName = $response->getResourceOwner()->getName();
        $setter = 'set' . ucfirst($serviceName) . 'AccessToken';
        $user->$setter($response->getAccessToken());
        return $user;
    }
    private function createRandstr($str_length = 6)
    {  
        $randstr = '';
        $arr = array_merge(range(0, 9), range('a', 'z'));
        $arr_len = count($arr);  
        for ($i = 0; $i < $str_length; $i++)  
        {  
            $rand = mt_rand(0, $arr_len-1);
            $randstr .= $arr[$rand]; 
        }  
        return $randstr;  
    }
 
}