<?php

namespace App\Services\User\Entity;


// Service worker notification subscription
class Subscription
{
    private $id;
    private $user;
    private $endpoint;
    private $auth;
    private $p256dh;
    private $agent;

    public function getId() {
        return $this->id;
    }
    /**
     * @return mixed
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getEndpoint()
    {
        return $this->endpoint;
    }

    /**
     * @param mixed $endpoint
     */
    public function setEndpoint($endpoint): void
    {
        $this->endpoint = $endpoint;
    }

    /**
     * @return mixed
     */
    public function getAuth()
    {
        return $this->auth;
    }

    /**
     * @param mixed $auth
     */
    public function setAuth($auth): void
    {
        $this->auth = $auth;
    }

    /**
     * @return mixed
     */
    public function getP256dh()
    {
        return $this->p256dh;
    }

    /**
     * @param mixed $p256dh
     */
    public function setP256dh($p256dh): void
    {
        $this->p256dh = $p256dh;
    }

    /**
     * @return mixed
     */
    public function getAgent()
    {
        return $this->agent;
    }

    /**
     * @param mixed $agent
     */
    public function setAgent($agent): void
    {
        $this->agent = $agent;
    }
}
