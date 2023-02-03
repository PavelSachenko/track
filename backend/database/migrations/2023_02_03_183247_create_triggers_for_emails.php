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
        DB::unprepared('
            CREATE OR REPLACE FUNCTION update_user_email() RETURNS TRIGGER AS
            $BODY$
            BEGIN
                IF old.email <> new.email THEN
                    UPDATE users SET email = new.email
                    WHERE id = old.user_id;
                END IF;
                RETURN NULL;
            END;
            $BODY$
            language plpgsql;


            CREATE OR REPLACE FUNCTION update_agent_agency_email() RETURNS TRIGGER AS
            $BODY$
            BEGIN
                CASE
                    when old.type = 1 THEN
                        UPDATE agents SET email = new.email
                        WHERE user_id = old.id;
                    when old.type = 2 THEN
                        UPDATE agencies SET email = new.email
                        WHERE user_id = old.id;
                    END CASE;
                RETURN NULL;
            END;
            $BODY$
                language plpgsql;


            CREATE TRIGGER after_agent_email_update
                AFTER UPDATE ON agents
                FOR EACH ROW
                WHEN ( old.email <> new.email )
            EXECUTE PROCEDURE update_user_email();

            CREATE TRIGGER after_agency_email_update
                AFTER UPDATE ON agencies
                FOR EACH ROW
                WHEN ( old.email <> new.email )
            EXECUTE PROCEDURE update_user_email();

            CREATE TRIGGER after_user_email_update_for_agency
                AFTER UPDATE ON users
                FOR EACH ROW
                WHEN ( old.email <> new.email )
            EXECUTE PROCEDURE update_agent_agency_email();
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
            drop trigger after_user_email_update_for_agency on public.users;
            drop trigger after_agency_email_update on public.agencies;
            drop trigger after_agent_email_update on public.agents;
            drop function public.update_user_email();
            drop function public.update_agent_agency_email();
        ');
    }
};
