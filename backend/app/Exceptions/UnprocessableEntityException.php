<?php

namespace App\Exceptions;

use Symfony\Component\HttpKernel\Exception\HttpException;

class UnprocessableEntityException extends HttpException
{
    public function __construct($message = "Something went wrong", \Throwable $previous = null, array $headers = [], $code = 422)
    {
        parent::__construct(422, $message, $previous, $headers, $code);
    }
}
