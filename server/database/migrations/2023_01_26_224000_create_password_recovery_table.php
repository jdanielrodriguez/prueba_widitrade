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
        Schema::create('password_recovery', function (Blueprint $table) {
            $table->increments('id');
            $table->string('uuid')->nullable()->default(null);
            $table->string('current_password')->nullable()->default(null);
            $table->string('password')->nullable()->default(null);
            $table->string('password_rep')->nullable()->default(null);
            $table->integer('state')->nullable()->default(1);

            $table->integer('current_auth_method_id')->nullable()->default(null)->unsigned();
            $table->foreign('current_auth_method_id')->references('id')->on('auth_method')->onDelete('cascade');

            $table->integer('auth_method_id')->nullable()->default(null)->unsigned();
            $table->foreign('auth_method_id')->references('id')->on('auth_method')->onDelete('cascade');

            $table->integer('user_id')->nullable()->default(null)->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('password_recovery');
    }
};
