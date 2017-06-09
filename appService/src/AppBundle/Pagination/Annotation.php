<?php
namespace AppBundle\Pagination;
/**
 * @Annotation
 * @Target("METHOD")
 */
final class Annotation
{
    /**
     * Parameter name
     *
     * @var string
     */
    public $service;
    /**
     * Parameter description
     *
     * @var string
     */
    public $perPage;
}