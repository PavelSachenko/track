<?php

namespace Database\Factories;

use App\Models\Agent;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agent>
 */
class AgentFactory extends Factory
{
    protected $model = Agent::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => null,
            'name' => fake()->firstName,
            'email' => null,
            'phone' => $this->getPhoneNumber(),
            'is_available' => $this->getIsAvailable(),
            'description' => $this->getDescription(),
        ];
    }

    private function getPhoneNumber(): ?string
    {
        if(rand(1, 2) == 1)
            return "+" . fake()->numberBetween(1000000, 2147483646);
        return null;
    }

    private function getDescription(): ?string
    {
        if(rand(1, 2) == 1)
            return fake()->text(150);
        return null;
    }

    private function getIsAvailable(): bool
    {
        if(rand(1, 2) == 1)
            return true;
        return false;
    }
}
