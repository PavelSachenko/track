<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

//Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//    return (int) $user->id === (int) $id;
//});

Broadcast::channel('namespace:channel', function (){
    // Some auth logic for example:
    return \Auth::user()->group === 'private-channel-group';
});

Broadcast::channel('namespace:channel-{id}', function ($user, $id){
    return $user->id === $id;
});
