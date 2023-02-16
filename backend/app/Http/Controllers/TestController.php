<?php

namespace App\Http\Controllers;

use Opekunov\Centrifugo\Centrifugo;

class TestController extends Controller
{
    public function index(Centrifugo $centrifugo)
    {
//        $centrifugo->publish('news', ['message' => 'Hello world']);
        $token = $centrifugo->generateConnectionToken('2', time()+ 3 * 60, [
            'name' => "pasha",
        ]);
        dump($token);
        $expire = now()->addDay(); //or you can use Unix: $expire = time() + 60 * 60 * 24;
        dump($expire);
        $apiSign = $centrifugo->generateSubscriptionToken('2', 'channel', $expire, [
            'name' => 'pasha',
        ]);
        dump($apiSign);
    }
}
