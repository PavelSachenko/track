<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SubscriptionRequest
 *
 * @property int $id
 * @property int $user_sender_id
 * @property int $user_receiver_id
 * @property string|null $message Message for invite subscribe, has default message `Greetings, we discussed this with you trough the phone. Hope you are accept our invite`
 * @property string $token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereUserReceiverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionRequest whereUserSenderId($value)
 * @mixin \Eloquent
 */
class SubscriptionRequest extends Model
{
    use HasFactory;
}
