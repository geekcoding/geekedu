<?php
// src/Acme/UserBundle/Document/User.php

namespace Site\UserBundle\Document;

use FOS\UserBundle\Document\User as BaseUser;
use FOS\UserBundle\Model\GroupInterface as GroupInterface;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

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
     * @MongoDB\String  @MongoDB\UniqueIndex
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
}
