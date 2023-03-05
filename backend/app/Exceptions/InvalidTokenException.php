<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class InvalidTokenException extends HttpException
{
    public function __construct(
        $message = "this token is not valid",
        \Throwable $previous = null,
        array $headers = [],
        $code = 400
    ) {
        parent::__construct(400, $message, $previous, $headers, $code);
    }
}
