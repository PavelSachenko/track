<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_times', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('current_mode', 30)->default('custom');
            $table->json('custom_times')->default('[{"day":1,"from":"08:00","to":"16:00"},{"day":2,"from":"08:00","to":"16:00"},{"day":3,"from":"08:00","to":"19:00"},{"day":4,"from":"08:00","to":"16:00"},{"day":5,"from":"08:00","to":"16:00"},{"day":6,"from":"08:00","to":"16:00"},{"day":7,"from":"08:00","to":"16:00"}]');
            $table->json('every_day_times')->default('{"from":"08:00","to":"16:00"}');
            $table->json('weekdays_times')->default('[{"day":6,"from":"08:00","to":"16:00"},{"day":7,"from":"08:00","to":"16:00"}]');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('work_times');
    }
};
