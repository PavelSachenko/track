<?php

namespace App\Services\Socket;

use App\Services\Contracts\Socket\ISocket;
use Pusher\Pusher as PusherLibrary;
use Pusher\PusherException;

class Pusher implements ISocket
{
    private PusherLibrary $pusher;

    /**
     * @throws PusherException
     */
    public function __construct()
    {
        $this->pusher = new PusherLibrary(
            config('broadcasting.connections.pusher.key'),
            config('broadcasting.connections.pusher.secret'),
            config('broadcasting.connections.pusher.app_id'),
            [
                'host' => config('broadcasting.connections.pusher.options.host'),
                'port' => config('broadcasting.connections.pusher.options.port'),
                'scheme' => config('broadcasting.connections.pusher.options.scheme'),
                'cluster' => config('broadcasting.connections.pusher.options.cluster')
            ]
        );
    }

    /**
     * @param string $channel
     * @param string $socket_id
     * @param string|null $custom_data
     * @return string
     * @throws PusherException
     */
    public function authorizeChannel(string $channel, string $socket_id, string $custom_data = null): string
    {
        return $this->pusher->authorizeChannel($channel, $socket_id, $custom_data);
    }

    /**
     * @param string $channel
     * @param string $socket_id
     * @param string $user_id
     * @param $user_info
     * @return string
     * @throws PusherException
     */
    public function authorizePresenceChannel(string $channel, string $socket_id, string $user_id, $user_info = null): string
    {
        return $this->pusher->authorizePresenceChannel($channel, $socket_id, $user_id, $user_info);
    }

    /**
     * @param string $socket_id
     * @param array $user_data
     * @return string
     * @throws PusherException
     */
    public function authenticateUser(string $socket_id, array $user_data): string
    {
        return $this->pusher->authenticateUser($socket_id, $user_data);
    }

    /**
     * @param string $user_id
     * @param string $event
     * @param $data
     * @param bool $already_encoded
     * @return object
     * @throws PusherException
     */
    public function sendToUser(string $user_id, string $event, $data, bool $already_encoded = false): object
    {
        return $this->pusher->sendToUser($user_id, $event, $data, $already_encoded);
    }

    /**
     * @param $channels
     * @param string $event
     * @param $data
     * @param array $params
     * @param bool $already_encoded
     * @return object
     * @throws PusherException
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Pusher\ApiErrorException
     */
    public function trigger($channels, string $event, $data, array $params = [], bool $already_encoded = false): object
    {
        return $this->pusher->trigger($channels, $event, $data, $params, $already_encoded);
    }

    /**
     * @param string $channel
     * @return object
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Pusher\ApiErrorException
     */
    public function getPresenceUsers(string $channel): object
    {
        return $this->pusher->getPresenceUsers($channel);
    }

    /**
     * @param array $params
     * @return object
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Pusher\ApiErrorException
     */
    public function getChannels(array $params = []): object
    {
        return $this->pusher->getChannels($params);
    }

    /**
     * @param string $channel
     * @param array $params
     * @return object
     * @throws PusherException
     * @throws \GuzzleHttp\Exception\GuzzleException
     * @throws \Pusher\ApiErrorException
     */
    public function getChannelInfo(string $channel, array $params = []): object
    {
        return $this->pusher->getChannelInfo($channel, $params);
    }
}
