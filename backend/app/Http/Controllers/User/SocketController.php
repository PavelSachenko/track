<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Contracts\Socket\ISocket;
use Illuminate\Http\Request;
use Pusher\PusherException;

class SocketController extends Controller
{
    private ISocket $socket;

    public function __construct(ISocket $socket)
    {
        $this->socket = $socket;
    }

    /**
     * @param Request $request
     * @return string
     */
    public function registrationChannel(Request $request): string
    {
        preg_match('/^(private|presence)/', $request->get('channel_name'), $matches);
        if ($matches) {
            return match ($matches[0]) {
                'private' => $this->socket->authorizeChannel($request->get('channel_name'), $request->get('socket_id')),
                'presence' => $this->socket->authorizePresenceChannel(
                    $request->get('channel_name'),
                    $request->get('socket_id'),
                    \Auth::user()->id,
                    \Auth::user()
                ),
                default => ''
            };
        }
        return '';
    }

    /**
     * @param Request $request
     * @return string
     */
    public function setUserConnection(Request $request): string
    {
        $user = \Auth::user();
        return $this->socket->authenticateUser(
            $request->get('socket_id'),
            ['id' => $user->id, User::USER_TYPES[$user->type] => $user]
        );
    }
}
