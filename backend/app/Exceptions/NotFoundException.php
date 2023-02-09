<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class NotFoundException extends HttpException
{
    public function __construct($message = "Not found", \Throwable $previous = null, array $headers = [], $code = 404)
    {
        parent::__construct(404, $message, $previous, $headers, $code);
    }
}
