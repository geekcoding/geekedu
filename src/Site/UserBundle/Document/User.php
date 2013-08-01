<?php

namespace Site\UserBundle\Document;

use FOS\UserBundle\Document\User as BaseUser;
use FOS\UserBundle\Model\GroupInterface as GroupInterface;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @MongoDB\Document(collection="users",repositoryClass="Site\UserBundle\Repository\UserRepository")
 */
class User extends BaseUser
{
    /**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /**
     * @MongoDB\ReferenceMany(targetDocument="Site\UserBundle\Document\Group")
     */
    protected $groups;

    /**
     * @MongoDB\String
     */
    protected $realname;

    /**
     * @MongoDB\File
     */
    protected $userimg;

    /**
     * @MongoDB\String
     */
    protected $gander;

    /**
     * @MongoDB\String
     */
    protected $description;

    /**
     * @var array
     */
    protected $roles = array();

    /**
     * @MongoDB\Int
     */
    protected $github_id;

     /**
     * @MongoDB\String
     */
    protected $github_name;

    /**
     * @MongoDB\String
     */
    protected $github_access_token;

    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Gets the groups granted to the user.
     *
     * @return Collection
     */
    public function getGroups()
    {
        return $this->groups ?: $this->groups = new ArrayCollection();
    }
    public function addGroup(GroupInterface $group)
    {
        if (!$this->getGroups()->contains($group)) {
            $this->getGroups()->add($group);
        }

        return $this;
    }
    public function removeGroup(GroupInterface $group)
    {
        if ($this->getGroups()->contains($group)) {
            $this->getGroups()->removeElement($group);
        }

        return $this;
    }
    public function __construct()
    {
        $this->groups = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Set realname
     *
     * @param string $realname
     * @return \User
     */
    public function setRealname($realname)
    {
        $this->realname = $realname;
        return $this;
    }

    /**
     * Get realname
     *
     * @return string $realname
     */
    public function getRealname()
    {
        return $this->realname;
    }

    /**
     * Set userimg
     *
     * @param file $userimg
     * @return \User
     */
    public function setUserimg($userimg)
    {
        $this->userimg = $userimg;
        return $this;
    }

    /**
     * Get userimg
     *
     * @return file $userimg
     */
    public function getUserimg()
    {
        return $this->userimg;
    }

    /**
     * Set gander
     *
     * @param string $gander
     * @return \User
     */
    public function setGander($gander)
    {
        $this->gander = $gander;
        return $this;
    }

    /**
     * Get gander
     *
     * @return string $gander
     */
    public function getGander()
    {
        return $this->gander;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return \User
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Get description
     *
     * @return string $description
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set github_id
     *
     * @param string $githubId
     * @return self
     */
    public function setGithubId($githubId)
    {
        $this->github_id = $githubId;
        return $this;
    }

    /**
     * Get github_id
     *
     * @return string $githubId
     */
    public function getGithubId()
    {
        return $this->github_id;
    }

    /**
     * Set github_access_token
     *
     * @param string $githubAccessToken
     * @return self
     */
    public function setGithubAccessToken($githubAccessToken)
    {
        $this->github_access_token = $githubAccessToken;
        return $this;
    }

    /**
     * Get github_access_token
     *
     * @return string $githubAccessToken
     */
    public function getGithubAccessToken()
    {
        return $this->github_access_token;
    }

    /**
     * Set github_name
     *
     * @param string $githubName
     * @return self
     */
    public function setGithubName($githubName)
    {
        $this->github_name = $githubName;
        return $this;
    }

    /**
     * Get github_name
     *
     * @return string $githubName
     */
    public function getGithubName()
    {
        return $this->github_name;
    }
}
