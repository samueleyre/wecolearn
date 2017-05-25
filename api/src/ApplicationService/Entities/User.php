<?php
/**
 * 	@Entity(repositoryClass="UserRepository") 
 	@Table(
 		name="users",
 		indexes={@Index(name="authentication", columns={"email","hash"} ) }
 	)
 */
class User
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
    public $email;
    
    /**
     * @Column(lenght=250)
     * @var string
     */
    public $hash;

    /**
     * @Column(type="integer",name="token_id")
     * @var int
     */
    public $tokenId;

    public $password;

}