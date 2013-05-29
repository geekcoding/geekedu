<?php

namespace Site\UserBundle\Document;

use FOS\UserBundle\Document\Group as BaseGroup;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="user_groups",repositoryClass="Site\UserBundle\Repository\GroupRepository")
 */
class Group extends BaseGroup
{
    /**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }
}
