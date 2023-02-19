<?php

namespace App\Providers;

use App\Services\Contracts\Socket\Socket;
use App\Services\Socket\Pusher;
use Illuminate\Support\ServiceProvider;

class SocketServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(Socket::class, function (){
            return new Pusher();
        });
    }

    public function boot()
    {
    }
}
