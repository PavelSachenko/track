<?php

namespace Database\Factories;

use App\Models\Agency;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Agency>
 */
class AgencyFactory extends Factory
{
    protected $model = Agency::class;

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
            'description' => $this->getDescription(),
            'url' => $this->getUrl(),
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

    private function getUrl(): string
    {
        if(rand(1, 2) == 1)
            return fake()->url;
        return false;
    }
}
