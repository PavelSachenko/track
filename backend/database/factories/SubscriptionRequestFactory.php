<?php

namespace Database\Factories;

use App\Models\SubscriptionRequest;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class SubscriptionRequestFactory extends Factory
{
    protected $model = SubscriptionRequest::class;
    public function definition(): array
    {
        return [
            'user_sender_id' => null,
            'user_receiver_id' => null,
            'message' => $this->faker->word(),
            'token' => Str::random(10),
            'status' => $this->faker->randomNumber(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
