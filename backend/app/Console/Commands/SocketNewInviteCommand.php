<?php

namespace App\Console\Commands;

use App\Enums\Socket\Agency\Subscription;
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
                $socket->sendToUser(
                  $user->id,
                    Subscription::NEW_FOLLOW,
                    [
                        "id" => 9999,
                        "name" => "Pasha",
                        "email" => "pasha@gmail.com",
                        "phone" => "+328230923230",
                        "description" => "Hello mafaker I'm here",
                        "img" => "https://s3.eu-west-2.amazonaws.com/gency.track.local/base64:GJNC5Y5MYTI3qiXaLsW629B59X0PEjLXjvlevt6ZERQ=/images/user/2/ee26908bf9629eeb4b37dac350f4754a.",
                        "is_available" => false,
                        "created_at" => "2023-02-16 16:19:22",
                        "updated_at" => "2023-02-16 16:19:22"
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
            case "delete":
                $agent = Agent::where('email', 'agent@gmail.com')->first();
                $agency = Agency::where('email', 'agency@gmail.com')->first();
                \App\Models\Subscription::where('user_id', $agent->user_id)->where('user_subscriber_id', $agency->user_id)->delete();
                \App\Models\SubscriptionRequest::where('user_receiver_id', $agent->user_id)->where('user_sender_id', $agency->user_id)->delete();
                break;
            default:
                echo "Event Not Found!\n";
        }
    }
}
