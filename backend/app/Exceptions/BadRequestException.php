<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class BadRequestException extends HttpException
{
    public function __construct($message = "Bad request", \Throwable $previous = null, array $headers = [], $code = 400)
    {
        parent::__construct(400, $message, $previous, $headers, $code);
    }
}
