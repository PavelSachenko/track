<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\WorkTime
 *
 * @property int $id
 * @property int $user_id
 * @property string $current_mode
 * @property mixed $custom_times
 * @property mixed $every_day_times
 * @property mixed $weekdays_times
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime query()
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereCurrentMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereCustomTimes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereEveryDayTimes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WorkTime whereWeekdaysTimes($value)
 * @mixin \Eloquent
 */
class WorkTime extends Model
{
    use HasFactory;

    const CUSTOM_MODE = 'custom';
    protected $guarded = [];
    protected $casts = [
        'every_day_times' => 'array',
        'custom_times' => 'array',
        'weekdays_times' => 'array',
    ];
}
