<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\WorkSchedule
 *
 * @property int $id
 * @property int $user_id
 * @property int $bound_user_id
 * @property int $type
 * @property string $from
 * @property string $to
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereBoundUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkSchedule whereUserId($value)
 * @mixin \Eloquent
 */
class WorkSchedule extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = [
        'agency'
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationship
    |--------------------------------------------------------------------------
    */
    public function agency(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Agency::class, 'user_id', 'bound_user_id');
    }
}
