<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class ForbiddenException extends HttpException
{
    public function __construct(
        $message = "Access is denied",
        \Throwable $previous = null,
        array $headers = [],
        $code = 403
    ) {
        parent::__construct(403, $message, $previous, $headers, $code);
    }
}
