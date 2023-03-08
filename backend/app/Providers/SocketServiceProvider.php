<?php

namespace App\Providers;

use App\Services\Contracts\Socket\ISocket;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class SocketServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ISocket::class, function () {
            return new Pusher();
        });
    }

    public function boot()
    {
    }
}
