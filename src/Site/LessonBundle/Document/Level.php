<?php 
namespace Site\LessonBundle\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
/**
 * @MongoDB\Document(collection="lesson_levels",repositoryClass="Site\LessonBundle\Repository\LevelRepository")
 */
class Level
{
    /**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /** @MongoDB\ReferenceMany(targetDocument="Lesson", mappedBy="level") */
    private $lessons;

    /**
     * @MongoDB\String @MongoDB\UniqueIndex
     */
    protected $name;

    /**
    * @MongoDB\Int
    */
    protected $order;
    
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
     * @return \Level
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
     * @return \Level
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
}
