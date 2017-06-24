<?php
/**
 * Created by PhpStorm.
 * User: etouraille
 * Date: 27/09/14
 * Time: 16:54
 */

namespace Bg\BgBundle\Metier\WriteBlog\Writer;


class WordPress {

    protected $client;

    public function __construct($url,$login,$password)
    {
        # Your Wordpress website is at: http://wp-website.com
        $endpoint = $url.'/xmlrpc.php';



        # Create client instance
        $this->client = new \HieuLe\WordpressXmlrpcClient\WordpressClient($endpoint,$login,$password);

    }

    public function ping() {
        return $this->client->deletePost(
            $this->client->newPost('Awsome!','Awsome!')
            )
        ;
    }

    public function newPost($title,$content)
    {
        return $this->client->newPost($title,$content);
    }

    public function newPage($title,$content)
    {
        return $this->client->newPost($title,$content,array('post_type'=>'page'));
    }
}
