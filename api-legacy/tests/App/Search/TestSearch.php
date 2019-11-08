<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 27/03/19
 * Time: 15:51
 */

namespace Tests\App\Search;

use App\_Search\DomainModel\Search\SearchService;
use App\_Tag\DomainModel\Tag\Tag;
use App\_User\DomainModel\User\User;
use PHPUnit\Framework\TestCase;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Tests\Utils\TruncateDatabase;

class TestSearch extends KernelTestCase
{

    protected function setUp() {
        $kernel = self::bootKernel();
        $em = $kernel->getContainer()->get('doctrine.orm.entity_manager');

        TruncateDatabase::process( $em );

        $user1 = new User();
        $user1->setUsername('user1');
        $user1->setEmail( 'edouard.touraille@gmail.com');
        $user1->setLatitude(45.764043);
        $user1->setLongitude(4.835659);
        $user1->setPassword('test');
        $user1->setProfilUrl('hello');
        $user1->setShowProfil(true);

        $tag = new Tag();
        $tag->setCreated(new \DateTime());
        $tag->setName('PHP');
        $tag->setType(0);
        $tag->setIteration(1);
        $user1->addTag( $tag );



        $user2 = new User();
        $user2->setUsername('user2');
        $user2->setEmail( 'edouard.touraille@laposte.net');
        $user2->setLatitude(45.764043);
        $user2->setLongitude(4.835659);
        $user2->setPassword('test');
        $user2->setProfilUrl('world');
        $user2->setShowProfil(true);

        $user2->addTag($tag);

        $em->persist( $user1 );
        $em->persist ( $user2 );
        $em->persist( $tag );
        $em->flush();

        $this->user = $user1;
        $this->search = new SearchService( $em );

    }

    public function testAdd()
    {
        $ret = $this->search->search($this->user, ['tag' => 'PHP'], null);
        $this->assertEquals(1, count($ret));
    }
}
