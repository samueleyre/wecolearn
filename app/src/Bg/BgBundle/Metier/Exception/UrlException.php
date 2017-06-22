<?php
namespace Bg\BgBundle\Metier\Exception;

class UrlException extends \Exception {
    
    protected $url;

    public function setUrl($url) {
        $this->url = $url;
    }

    public function getUrl() {
        return $this->url;
    }

}
