<?php

namespace App\Models;

use Database\Factories\AgentFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * App\Models\Agent
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $phone
 * @property string|null $description
 * @property string|null $img
 * @property bool $is_available Available to work or no
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Agent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Agent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Agent query()
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereImg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereIsAvailable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agent whereUserId($value)
 * @mixin \Eloquent
 */
class Agent extends Authenticatable
{
    use HasFactory;

    protected $appends = ['type'];
    protected $guarded = ['created_at'];

    protected $hidden = [
        'user_id',
    ];

    public function getIdAttribute()
    {
        return $this->user_id;
    }

    public function getTypeAttribute(): int
    {
        return User::TYPE_AGENT;
    }

    protected static function newFactory(): AgentFactory
    {
        return AgentFactory::new();
    }

    /*
    |--------------------------------------------------------------------------
    | Relationship
    |--------------------------------------------------------------------------
    */
    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
