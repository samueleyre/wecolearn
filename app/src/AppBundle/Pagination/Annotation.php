<?php
namespace AppBundle\Pagination;
/**
 * @Annotation
 * @Target("METHOD")
 */
final class Annotation
{
    /**
     * Query Service
     *
     * @var string
     */
    public $service;
    /**
     * Paramter perPage
     *
     * @var string
     */
    public $perPage;
    /**
     * Service setters
     *
     * @var array
     */
    public $setters;

}