<?php

namespace BusinessModel;

abstract class AbstractData
{
    private $entry_point;
    private $post_type;
    abstract public function register_custom_type();
}
