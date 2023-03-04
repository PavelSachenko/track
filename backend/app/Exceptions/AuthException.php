<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class AuthException extends HttpException
{
    /**
     * @param $message
     * @param Throwable|null $previous
     * @param array $headers
     * @param $code
     */
    public function __construct(
        $message = 'not authorized user',
        Throwable $previous = null,
        array $headers = [],
        $code = 401
    ) {
        parent::__construct(401, $message, $previous, $headers, $code);
    }
}
