<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class AuthException extends HttpException
{
    public function __construct($message = 'not authorized user', \Throwable $previous = null, array $headers = [], $code = 401)
    {
        parent::__construct(401, $message, $previous, $headers, $code);
    }
}
