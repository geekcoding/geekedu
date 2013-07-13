<?php 
namespace Site\LessonBundle\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="lessons",repositoryClass="Site\LessonBundle\Repository\LessonRepository")
 */
class Lesson
{
    /**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /** @MongoDB\ReferenceOne(targetDocument="Type",inversedBy="lessons") */
    private $type;

    /** @MongoDB\ReferenceOne(targetDocument="Level",inversedBy="lessons") */
    private $level;

    /** @MongoDB\ReferenceMany(targetDocument="Video", mappedBy="lesson") */
    private $videos;

    /**
     * @MongoDB\String  @MongoDB\UniqueIndex
     */
    protected $name;

    /**
     * @MongoDB\Float
     */
    protected $price;

    /**
    * @MongoDB\String
    */
    protected $image;

    /**
    * @MongoDB\String
    */
    protected $uptime;

    /**
     * @MongoDB\String
     */
    protected $description;

    /**
     * @MongoDB\String
     */
    protected $index;

    /**
     * @MongoDB\Int
     */
    protected $learn;

    /**
    * @MongoDB\Int
    */
    protected $order;
    public function __construct()
    {
        $this->videos = new \Doctrine\Common\Collections\ArrayCollection();
    }
    
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
     * Set type
     *
     * @param Site\LessonBundle\Document\Type $type
     * @return \Lesson
     */
    public function setType(\Site\LessonBundle\Document\Type $type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Get type
     *
     * @return Site\LessonBundle\Document\Type $type
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set level
     *
     * @param Site\LessonBundle\Document\Level $level
     * @return \Lesson
     */
    public function setLevel(\Site\LessonBundle\Document\Level $level)
    {
        $this->level = $level;
        return $this;
    }

    /**
     * Get level
     *
     * @return Site\LessonBundle\Document\Level $level
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Add videos
     *
     * @param Site\LessonBundle\Document\Video $videos
     */
    public function addVideo(\Site\LessonBundle\Document\Video $videos)
    {
        $this->videos[] = $videos;
    }

    /**
    * Remove videos
    *
    * @param <variableType$videos
    */
    public function removeVideo(\Site\LessonBundle\Document\Video $videos)
    {
        $this->videos->removeElement($videos);
    }

    /**
     * Get videos
     *
     * @return Doctrine\Common\Collections\Collection $videos
     */
    public function getVideos()
    {
        return $this->videos;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return \Lesson
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
     * Set price
     *
     * @param float $price
     * @return \Lesson
     */
    public function setPrice($price)
    {
        $this->price = $price;
        return $this;
    }

    /**
     * Get price
     *
     * @return float $price
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set image
     *
     * @param string $image
     * @return \Lesson
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * Get image
     *
     * @return string $image
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * Set uptime
     *
     * @param string $uptime
     * @return \Lesson
     */
    public function setUptime($uptime)
    {
        $this->uptime = $uptime;
        return $this;
    }

    /**
     * Get uptime
     *
     * @return string $uptime
     */
    public function getUptime()
    {
        return $this->uptime;
    }

    /**
     * Set order
     *
     * @param int $order
     * @return \Lesson
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
     * Set learn
     *
     * @param int $learn
     * @return self
     */
    public function setLearn($learn)
    {
        $this->learn = $learn;
        return $this;
    }

    /**
     * Get learn
     *
     * @return int $learn
     */
    public function getLearn()
    {
        return $this->learn;
    }

    /**
     * Set index
     *
     * @param string $index
     * @return self
     */
    public function setIndex($index)
    {
        $this->index = $index;
        return $this;
    }

    /**
     * Get index
     *
     * @return string $index
     */
    public function getIndex()
    {
        return $this->index;
    }
}
