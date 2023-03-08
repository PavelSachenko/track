<?php

namespace App\Services\Contracts\Socket;

interface ISocket
{
    public function authorizeChannel(string $channel, string $socket_id, string $custom_data = null): string;

    public function authorizePresenceChannel(string $channel, string $socket_id, string $user_id, $user_info = null): string;

    public function authenticateUser(string $socket_id, array $user_data): string;

    public function sendToUser(string $user_id, string $event, $data, bool $already_encoded = false): object;

    public function trigger($channels, string $event, $data, array $params = [], bool $already_encoded = false): object;

    public function getPresenceUsers(string $channel): object;

    public function getChannels(array $params = []): object;

    public function getChannelInfo(string $channel, array $params = []): object;
}
