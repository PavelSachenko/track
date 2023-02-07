<?php

namespace App\Models;

use Database\Factories\AgencyFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

/**
 * App\Models\Agency
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $phone
 * @property string|null $description
 * @property string|null $img
 * @property string|null $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Agency newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Agency newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Agency query()
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereImg($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Agency whereUserId($value)
 * @mixin \Eloquent
 */
class Agency extends Authenticatable
{
    use HasFactory;

    protected $appends = ['type'];
    protected $guarded = ['created_at'];

    protected $hidden = ['user_id'];

    public function getIdAttribute(): int
    {
        return $this->user_id;
    }

    public function getTypeAttribute(): int
    {
        return User::TYPE_AGENCY;
    }

    protected static function newFactory(): AgencyFactory
    {
        return AgencyFactory::new();
    }

}
