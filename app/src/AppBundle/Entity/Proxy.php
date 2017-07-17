<?php
namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="proxy")
 */
class Proxy
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string")
     */
    protected $host;

    /**
     * @ORM\Column(type="integer")
     */
    protected $port;

    /**
     * @ORM\Column(type="integer")
    */
    protected $secure=0;

    /**
     * @ORM\Column(type="integer", name="foundTime")
    */
    protected $foundTime;

    /**
     * @ORM\Column(type="integer", nullable=true)
    */
    protected $down;

    /**
     * @ORM\Column(type="integer", nullable=true, name="downTime")
    */
    protected $downTime;

    /**
     * @ORM\Column(type="integer", name="googleBlacklisted", nullable=true)
    */
    protected $gBlacklisted;

    /**
     * @ORM\Column(type="integer", name="googleBlacklistedTime", nullable=true)
    */
    protected $gBlacklistedTime;

    /**
     * @ORM\Column(type="integer", name="useTime", nullable=true)
    */
    protected $useTime;


    public function __construct() {
        $this->foundTime = time();
        $this->down = 1;
        $this->downTime = time();
        
    }

    public function disable() {
        $this->down = 1;
        $this->gBlacklisted = null;
        $this->downTime = time();

    }

    public function blacklist() {
        $this->gBlacklisted = 1;
        $this->gBlacklistedTime = time();
    }

    public function use() {
        $this->useTime = time();
    }

    public function getId() {
    	return $this->id;
    }

    /**
     * Set host
     *
     * @param string $host
     *
     * @return Proxy
     */
    public function setHost($host)
    {
        $this->host = $host;

        return $this;
    }

    /**
     * Get host
     *
     * @return string
     */
    public function getHost()
    {
        return $this->host;
    }

    /**
     * Set port
     *
     * @param integer $port
     *
     * @return Proxy
     */
    public function setPort($port)
    {
        $this->port = $port;

        return $this;
    }

    /**
     * Get port
     *
     * @return integer
     */
    public function getPort()
    {
        return $this->port;
    }

    /**
     * Set secure
     *
     * @param integer $secure
     *
     * @return Proxy
     */
    public function setSecure($secure)
    {
        $this->secure = $secure;

        return $this;
    }

    /**
     * Get secure
     *
     * @return integer
     */
    public function getSecure()
    {
        return $this->secure;
    }

    /**
     * Set foundTime
     *
     * @param \DateTime $foundTime
     *
     * @return Proxy
     */
    public function setFoundTime($foundTime)
    {
        $this->foundTime = $foundTime;

        return $this;
    }

    /**
     * Get foundTime
     *
     * @return \DateTime
     */
    public function getFoundTime()
    {
        return $this->foundTime;
    }

    /**
     * Set down
     *
     * @param integer $down
     *
     * @return Proxy
     */
    public function setDown($down)
    {
        $this->down = $down;

        return $this;
    }

    /**
     * Get down
     *
     * @return integer
     */
    public function getDown()
    {
        return $this->down;
    }

    /**
     * Set downTime
     *
     * @param \DateTime $downTime
     *
     * @return Proxy
     */
    public function setDownTime($downTime)
    {
        $this->downTime = $downTime;

        return $this;
    }

    /**
     * Get downTime
     *
     * @return \DateTime
     */
    public function getDownTime()
    {
        return $this->downTime;
    }

    /**
     * Set gBlacklisted
     *
     * @param integer $gBlacklisted
     *
     * @return Proxy
     */
    public function setGBlacklisted( $value )
    {
        $this->gBlacklisted = $value;

        return $this;
    }

    /**
     * Get gBlacklisted
     *
     * @return integer
     */
    public function getGBlacklisted()
    {
        return $this->gBlacklisted;
    }

    /**
     * Set gBlacklistedTime
     *
     * @param \DateTime $gBlacklistedTime
     *
     * @return Proxy
     */
    public function setGBlacklistedTime($gBlacklistedTime)
    {
        $this->gBlacklistedTime = $gBlacklistedTime;

        return $this;
    }

    /**
     * Get gBlacklistedTime
     *
     * @return \DateTime
     */
    public function getGBlacklistedTime()
    {
        return $this->gBlacklistedTime;
    }

    /**
     * Set useTime
     *
     * @param \DateTime $useTime
     *
     * @return Proxy
     */
    public function setUseTime($useTime)
    {
        $this->useTime = $useTime;

        return $this;
    }

    /**
     * Get useTime
     *
     * @return \DateTime
     */
    public function getUseTime()
    {
        return $this->useTime;
    }
}
