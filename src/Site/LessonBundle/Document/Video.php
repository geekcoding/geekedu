<?php 
namespace Site\LessonBundle\Document;
use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
/**
 * @MongoDB\Document(collection="lesson_videos",repositoryClass="Site\LessonBundle\Repository\VideoRepository")
 */
class Video
{
    /**
     * @MongoDB\Id(strategy="INCREMENT")
     */
    protected $id;

    /** @MongoDB\ReferenceOne(targetDocument="Lesson",inversedBy="videos") */
    private $lesson;    

    /**
     * @MongoDB\String  @MongoDB\UniqueIndex
     */
    protected $title;

    /**
     * @MongoDB\Int
     */
    protected $order;

    /**
    * @MongoDB\Int
    */
    protected $playtimes;

    /**
    * @MongoDB\String
    */
    protected $downpath;

    /**
    * @MongoDB\String
    */
    protected $imgpath;

    /**
     * @MongoDB\Boolean
     */
    protected $public;

    /**
    * @MongoDB\Date
    */
    protected $ctime;

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
     * Set lesson
     *
     * @param Site\LessonBundle\Document\Lesson $lesson
     * @return \Video
     */
    public function setLesson(\Site\LessonBundle\Document\Lesson $lesson)
    {
        $this->lesson = $lesson;
        return $this;
    }

    /**
     * Get lesson
     *
     * @return Site\LessonBundle\Document\Lesson $lesson
     */
    public function getLesson()
    {
        return $this->lesson;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return \Video
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
     * Set order
     *
     * @param int $order
     * @return \Video
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
     * Set playtimes
     *
     * @param int $playtimes
     * @return \Video
     */
    public function setPlaytimes($playtimes)
    {
        $this->playtimes = $playtimes;
        return $this;
    }

    /**
     * Get playtimes
     *
     * @return int $playtimes
     */
    public function getPlaytimes()
    {
        return $this->playtimes;
    }

    /**
     * Set downpath
     *
     * @param string $downpath
     * @return \Video
     */
    public function setDownpath($downpath)
    {
        $this->downpath = $downpath;
        return $this;
    }

    /**
     * Get downpath
     *
     * @return string $downpath
     */
    public function getDownpath()
    {
        return $this->downpath;
    }

    /**
     * Set imgpath
     *
     * @param string $imgpath
     * @return \Video
     */
    public function setImgpath($imgpath)
    {
        $this->imgpath = $imgpath;
        return $this;
    }

    /**
     * Get imgpath
     *
     * @return string $imgpath
     */
    public function getImgpath()
    {
        return $this->imgpath;
    }

    /**
     * Set ctime
     *
     * @param date $ctime
     * @return \Video
     */
    public function setCtime($ctime)
    {
        $this->ctime = $ctime;
        return $this;
    }

    /**
     * Get ctime
     *
     * @return date $ctime
     */
    public function getCtime()
    {
        return $this->ctime;
    }

    /**
     * Set public
     *
     * @param boolean $public
     * @return self
     */
    public function setPublic($public)
    {
        $this->public = $public;
        return $this;
    }

    /**
     * Get public
     *
     * @return boolean $public
     */
    public function getPublic()
    {
        return $this->public;
    }
}
