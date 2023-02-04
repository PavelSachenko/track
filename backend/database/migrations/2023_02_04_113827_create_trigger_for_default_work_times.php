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
        DB::unprepared('
        CREATE OR REPLACE FUNCTION add_default_work_time() RETURNS TRIGGER AS
        $BODY$
        BEGIN
            INSERT INTO work_times (user_id, created_at, updated_at) VALUES (new.id, current_timestamp, current_timestamp);
            RETURN NULL;
        END;
        $BODY$
        language plpgsql;

        CREATE TRIGGER after_agent_email_update
            AFTER INSERT ON users
            FOR EACH ROW

        EXECUTE PROCEDURE add_default_work_time();
        ');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::unprepared('
            drop trigger after_agent_email_update on public.agents;
            drop function public.update_user_email();
        ');
    }
};
