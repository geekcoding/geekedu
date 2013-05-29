<?php
namespace Site\CommonBundle\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="commons",repositoryClass="Site\CommonBundle\Repository\Commonrepository")
 */
class Common
{
	/**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /**
     * @MongoDB\String
     */
    protected $title;

    /**
     * @MongoDB\String
     */
    protected $meta;

    /**
     * @MongoDB\String
     */
    protected $description;
    
    /**
     * @MongoDB\String
     */
    protected $homeblock;

    /**
     * @MongoDB\String
     */
    protected $homevideo;

    /**
     * @MongoDB\String
     */
    protected $homeimg;

    /**
     * @MongoDB\Boolean
     */
    protected $show;

    /**
     * Get id
     *
     * @return int_id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return self
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Get title
     *
     * @return string $title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set meta
     *
     * @param string $meta
     * @return self
     */
    public function setMeta($meta)
    {
        $this->meta = $meta;
        return $this;
    }

    /**
     * Get meta
     *
     * @return string $meta
     */
    public function getMeta()
    {
        return $this->meta;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return self
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
     * Set homeblock
     *
     * @param string $homeblock
     * @return self
     */
    public function setHomeblock($homeblock)
    {
        $this->homeblock = $homeblock;
        return $this;
    }

    /**
     * Get homeblock
     *
     * @return string $homeblock
     */
    public function getHomeblock()
    {
        return $this->homeblock;
    }

    /**
     * Set homevideo
     *
     * @param string $homevideo
     * @return self
     */
    public function setHomevideo($homevideo)
    {
        $this->homevideo = $homevideo;
        return $this;
    }

    /**
     * Get homevideo
     *
     * @return string $homevideo
     */
    public function getHomevideo()
    {
        return $this->homevideo;
    }

    /**
     * Set homeimg
     *
     * @param string $homeimg
     * @return self
     */
    public function setHomeimg($homeimg)
    {
        $this->homeimg = $homeimg;
        return $this;
    }

    /**
     * Get homeimg
     *
     * @return string $homeimg
     */
    public function getHomeimg()
    {
        return $this->homeimg;
    }

    /**
     * Set show
     *
     * @param boolean $show
     * @return self
     */
    public function setShow($show)
    {
        $this->show = $show;
        return $this;
    }

    /**
     * Get show
     *
     * @return boolean $show
     */
    public function getShow()
    {
        return $this->show;
    }
}
