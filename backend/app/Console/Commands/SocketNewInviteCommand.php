<?php

namespace App\Console\Commands;

use App\Enums\Socket\Agent\Invite;
use App\Models\Agency;
use App\Models\Agent;
use App\Services\Contracts\Socket\Socket;
use Illuminate\Console\Command;

class SocketNewInviteCommand extends Command
{
    protected $signature = 'socket:invite {event}';

    protected $description = 'Command description';

    public function handle(Socket $socket)
    {

        switch ($this->argument('event')){
            case "new":
                $user = Agent::where('email', 'agent@gmail.com')->first();
                $socket->sendToUser(
                    $user->id,
                    Invite::NEW,
                    [
                        'id' => 9999,
                        'user_receiver_id' => $user->id,
                        'created_at' => date('Y-m-d H:i:s'),
                        'email' => $user->email,
                        'name' => $user->name,
                        'img' => $user->img,
                        'message' => "Hello from Backend",
                        'type' => 2,
                    ]
                );
                echo "Socket was sent\n";
                break;
            case "accept":
                $user = Agency::where('email', 'agency@gmail.com')->first();
                $socket->sendToUser(
                    $user->id,
                    Invite::ACCEPT,
                    [
                        'id' => 9999,
                    ]
                );
                echo "Socket was sent\n";
                break;
            case "decline":
                $user = Agency::where('email', 'agency@gmail.com')->first();
                $socket->sendToUser(
                    $user->id,
                    Invite::DECLINE,
                    [
                        'id' => 9999,
                    ]
                );
                echo "Socket was sent\n";
                break;
            default:
                echo "Event Not Found!\n";
        }
    }
}
