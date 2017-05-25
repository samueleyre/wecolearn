<?php

// src/Bug.php
/**
 *  @Entity(repositoryClass="TokenRepository") 
    @Table(
        name="tokens",
        indexes={ @Index(name="token", columns={"token"} ) } 
    )
 */
class Token
{
    /**
     * @Id @Column(type="integer") @GeneratedValue
     * @var int
     */
    public $id;
    /**
     * @Column(type="string")
     * @var string
     */
    public $token;
    /**
     * @Column(type="datetime",name="expiration_date")
     * @var Datetime
     */
    public $expirationDate;
    
}