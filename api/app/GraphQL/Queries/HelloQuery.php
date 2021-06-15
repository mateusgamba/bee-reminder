<?php

namespace App\GraphQL\Queries;

class HelloQuery
{
    /**
     * @return string
     */
    public function hello(): string
    {
        return 'it is working!';
    }

}
