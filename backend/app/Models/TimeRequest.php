<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\TimeRequest
 *
 * @property int $id
 * @property int $user_sender_id
 * @property int $user_receiver_id
 * @property string $message
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereUserReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TimeRequest whereUserSenderId($value)
 * @mixin \Eloquent
 */
class TimeRequest extends Model
{
    use HasFactory;
}
