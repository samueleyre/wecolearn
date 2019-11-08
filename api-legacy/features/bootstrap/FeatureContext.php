<?php

use Behat\Behat\Context\Context;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * This context class contains the definitions of the steps used by the demo
 * feature file. Learn how to get started with Behat and BDD on Behat's website.
 *
 * @see http://behat.org/en/latest/quick_start.html
 */
class FeatureContext implements Context
{
    /**
     * @var KernelInterface
     */
    private $kernel;

    /**
     * @var Response|null
     */
    private $response;

    /**
     * @var \Doctrine\ORM\EntityManagerInterface
     */
    private $em;

    private $container;

    private $token;

    private $restContext;

    private static $cont;

    public function __construct(
        KernelInterface $kernel,
        \Doctrine\ORM\EntityManagerInterface $em ,
        \Symfony\Component\DependencyInjection\ContainerInterface $container )
    {
        $this->kernel = $kernel;
        $this->em = $em;
        $this->container = $container;
        self::$cont = $container;
    }

    /**
     * @param BeforeScenarioScope $scope
     *
     * @BeforeScenario
     */
    public function gatherContexts(Behat\Behat\Hook\Scope\BeforeScenarioScope $scope)
    {
        $environment = $scope->getEnvironment();

        $this->restContext = $environment->getContext('Behatch\Context\RestContext');

    }

    /**
     * @Given I am authenticated as admin
     */
    public function iAmAuthenticatedAsAdmin()
    {
        $name = 'Authorization';
        $value = 'Bearer xxxxxxxx';


    }

    /**
     * @When I purge user
     */
    public function iPurgeUser()
    {
        $dump_queries = [
            'SET FOREIGN_KEY_CHECKS=0;',
            'TRUNCATE TABLE user_domain;',
            'TRUNCATE TABLE fos_user',
            'TRUNCATE TABLE image',
            'SET FOREIGN_KEY_CHECKS=1;',
        ];
        foreach( $dump_queries as $query ) {
            $stmp = $this->em->getConnection()->prepare($query);
            $stmp->execute();
        }
    }

    /**
     * @When I purge database
     */
    public function iPurgeDatabase()
    {
        self::purgeDatabase( $this->em );
    }

    public static function purgeDatabase( $em ) {
        \Tests\Utils\TruncateDatabase::process($em );
    }


    /**
     * @When I load fixture
     */
    public function iLoadFixture()
    {
        $fixture = new \App\DataFixtures\ORM\Fixtures();
        $fixture->setContainer($this->container );
        $fixture->load($this->em);

    }

    public static function loadFixture() {
        $fixture = new \App\DataFixtures\ORM\Fixtures();
        $fixture->setContainer(self::$cont );
        $fixture->load(self::$cont->get('doctrine.orm.entity_manager'));
    }

    /**
     * @When I create authenticated user test
     */
    public function iCreatAuthenticatedUserTest($index='')  {

        try {
            $userService = $this->container->get('create_user_service');

            $user = new \App\_User\DomainModel\User\User();
            $user->setEmail(sprintf('edouard.touraille%s@gmail.com', $index==''?'':'+'.$index));
            $user->setFirstName('Edouard');
            $user->setPassword('test');
            $image = new \App\_User\DomainModel\Image\Image();
            $image->setFileName('temp.png');
            $user->setImage($image);
            $userService->process($user);
            $this->token = $this->container->get('lexik_jwt_authentication.jwt_manager')->create($user);
            $this->restContext->iAddHeaderEqualTo('Authorization', sprintf('Bearer %s', $this->token));

        } catch(\Exception $e ) {
            dump($e->getMessage());
            dump( $e->getTraceAsString());
            exit();
        }
    }

    /**
     * @When I create user test :arg1
     */
    public function iCreateUserTest($index)
    {
        $userService = $this->container->get('create_user_service');

        $user = new \App\_User\DomainModel\User\User();
        $user->setEmail(sprintf('edouard.touraille%s@gmail.com', $index==''?'':'+'.$index));
        $user->setFirstName('Edouard');
        $user->setPassword('test');
        $image = new \App\_User\DomainModel\Image\Image();
        $image->setFileName('temp.png');
        $user->setImage($image);
        $userService->process($user);

    }

    /**
     * @When I authenticate as :arg1
     */
    public function iAuthenticateAs($index)
    {
        $user = $this->em->getRepository(\App\_User\DomainModel\User\User::class)->findOneByEmail(sprintf('edouard.touraille%s@gmail.com', $index==''?'':'+'.$index));
        $this->token = $this->container->get('lexik_jwt_authentication.jwt_manager')->create($user);
        $this->restContext->iAddHeaderEqualTo('Authorization', sprintf('Bearer %s', $this->token));

    }


    /**
     * @When I create authenticated user test :arg1
     */
    public function iCreateAuthenticatedUserTest($arg1)
    {
        $this->iCreateUserTest($arg1);
    }


    /**
     * @When a demo scenario sends a request to :path
     */
    public function aDemoScenarioSendsARequestTo(string $path)
    {
        $this->response = $this->kernel->handle(Request::create($path, 'GET'));
    }

    /**
     * @Then the response should be received
     */
    public function theResponseShouldBeReceived()
    {
        if ($this->response === null) {
            throw new \RuntimeException('No response received');
        }
    }

    /**
     * @AfterScenario
     */
    public function cleanDB( $scope)
    {
        //$this->iPurgeDatabase();
        //$this->iLoadFixture();
        //$testData = new \Tests\Utils\CreateTestData( $this->container);
        //$testData->process();
        // clean database after scenarios,
        // tagged with @database
    }

    /**
     * @AfterSuite
     */
    public static function teardown( Behat\Testwork\Hook\Scope\AfterSuiteScope $event ) {

        \Tests\Utils\TruncateDatabase::process( self::$cont->get('doctrine.orm.entity_manager'));

        self::loadFixture();

        $testData = new \Tests\Utils\CreateTestData( self::$cont );
        $testData->process();


    }
}
