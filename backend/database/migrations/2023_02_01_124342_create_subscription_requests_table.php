<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscription_requests', function (Blueprint $table) {
            $defaultMessage = 'Greetings, we discussed this with you trough the phone. Hope you are accept our invite';
            $table->id();
            $table->unsignedBigInteger('user_sender_id');
            $table->unsignedBigInteger('user_receiver_id');

            $table->string('message', 500)
                ->default($defaultMessage)
                ->nullable()
                ->comment("Message for invite subscribe, has default message `Greetings, we discussed this with you trough the phone. Hope you are accept our invite`");
            $table->string('token', 255);
            $table->timestamps();

            $table->foreign('user_sender_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('user_receiver_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subscription_requests');
    }
};
