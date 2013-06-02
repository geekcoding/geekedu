<?php
namespace Site\CommonBundle\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="common_navigates",repositoryClass="Site\CommonBundle\Repository\Navigaterepository")
 */
class Navigate
{
	/**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /**
     * @MongoDB\String
     */
    protected $name;

    /**
     * @MongoDB\String
     */
    protected $link;

    /**
     * @MongoDB\String
     */
    protected $tip;

    /**
     * @MongoDB\String
     */
    protected $icon;

    /**
     * @MongoDB\Boolean
     */
    protected $blank;

    /**
     * @MongoDB\Int
     */
    protected $order;
    

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
     * Set name
     *
     * @param string $name
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @return string $name
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set link
     *
     * @param string $link
     * @return self
     */
    public function setLink($link)
    {
        $this->link = $link;
        return $this;
    }

    /**
     * Get link
     *
     * @return string $link
     */
    public function getLink()
    {
        return $this->link;
    }

    /**
     * Set tip
     *
     * @param string $tip
     * @return self
     */
    public function setTip($tip)
    {
        $this->tip = $tip;
        return $this;
    }

    /**
     * Get tip
     *
     * @return string $tip
     */
    public function getTip()
    {
        return $this->tip;
    }

    /**
     * Set icon
     *
     * @param string $icon
     * @return self
     */
    public function setIcon($icon)
    {
        $this->icon = $icon;
        return $this;
    }

    /**
     * Get icon
     *
     * @return string $icon
     */
    public function getIcon()
    {
        return $this->icon;
    }

    /**
     * Set order
     *
     * @param int $order
     * @return self
     */
    public function setOrder($order)
    {
        $this->order = $order;
        return $this;
    }

    /**
     * Get order
     *
     * @return int $order
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * Set blank
     *
     * @param boolean $blank
     * @return self
     */
    public function setBlank($blank)
    {
        $this->blank = $blank;
        return $this;
    }

    /**
     * Get blank
     *
     * @return boolean $blank
     */
    public function getBlank()
    {
        return $this->blank;
    }
}
