<?php 
namespace Site\LessonBundle\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\Document(collection="lesson_types",repositoryClass="Site\LessonBundle\Repository\TypeRepository")
 */
class Type
{
    /**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /** @MongoDB\ReferenceMany(targetDocument="Lesson", mappedBy="type") */
    private $lessons;

    /**
     * @MongoDB\String @MongoDB\UniqueIndex
     */
    protected $name;

    /**
    * @MongoDB\Int
    */
    protected $order;

    /**
    * @MongoDB\String
    */
    protected $path;
    public function __construct()
    {
        $this->lessons = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Add lessons
     *
     * @param Site\LessonBundle\Document\Lesson $lessons
     */
    public function addLesson(\Site\LessonBundle\Document\Lesson $lessons)
    {
        $this->lessons[] = $lessons;
    }

    /**
    * Remove lessons
    *
    * @param <variableType$lessons
    */
    public function removeLesson(\Site\LessonBundle\Document\Lesson $lessons)
    {
        $this->lessons->removeElement($lessons);
    }

    /**
     * Get lessons
     *
     * @return Doctrine\Common\Collections\Collection $lessons
     */
    public function getLessons()
    {
        return $this->lessons;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return \Type
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
     * Set order
     *
     * @param int $order
     * @return \Type
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
     * Set path
     *
     * @param string $path
     * @return \Type
     */
    public function setPath($path)
    {
        $this->path = $path;
        return $this;
    }

    /**
     * Get path
     *
     * @return string $path
     */
    public function getPath()
    {
        return $this->path;
    }
}
