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
        Schema::defaultStringLength(300);
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username');
            $table->string('password');
            $table->string('email');
            $table->string('code')->nullable()->default(null);
            $table->string('names')->nullable()->default(null);
            $table->string('lastnames')->nullable()->default(null);
            $table->string('description')->nullable()->default(null);
            $table->date('birth')->nullable()->default(null);
            $table->string('picture')->nullable()->default(null);
            $table->dateTime('last_conection')->useCurrent();
            $table->text('twitter_id')->nullable()->default(null);
            $table->text('tiktok_id')->nullable()->default(null);
            $table->text('facebook_id')->nullable()->default(null);
            $table->text('google_id')->nullable()->default(null);
            $table->text('google_token')->nullable()->default(null);
            $table->text('google_id_token')->nullable()->default(null);
            $table->string('pic1')->nullable()->default(null);
            $table->string('pic2')->nullable()->default(null);
            $table->string('pic3')->nullable()->default(null);
            $table->text('token')->nullable()->default(null);
            $table->string('auth_type')->nullable()->default(0);
            $table->integer('state')->nullable()->default(1);

            $table->integer('rol_id')->nullable()->default(null)->unsigned();
            $table->foreign('rol_id')->references('id')->on('roles')->onDelete('cascade');

            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
