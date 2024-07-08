<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;
class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeZone = 'America/Guatemala';
        DB::table('roles')->insert([
            'id'                => 1,
            'name'              => 'Administrador',
            'description'       => 'Administrador del sistema',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('roles')->insert([
            'id'                => 2,
            'name'              => 'Creador de Contenido',
            'description'       => 'Creador de contenido',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('roles')->insert([
            'id'                => 3,
            'name'              => 'Cliente',
            'description'       => 'Visor de contenido',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('roles')->insert([
            'id'                => 4,
            'name'              => 'Subscriptor',
            'description'       => 'Usuario sin password',
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 1,
            'name'              => 'Simple',
            'description'       => 'Simple email and password auth',
            'logo'              => 'https://via.placeholder.com/500x250.png?text=Simple',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 2,
            'name'              => 'Google',
            'description'       => 'google api auth',
            'logo'              => 'https://pbs.twimg.com/profile_images/1214480780472279040/sH9e2ctc_400x400.png',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 3,
            'name'              => 'Facebook',
            'description'       => 'facebook api auth',
            'logo'              => 'https://www.facebook.com/images/fb_icon_325x325.png',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method')->insert([
            'id'                => 4,
            'name'              => 'Tiktok',
            'description'       => 'tiktok api auth',
            'logo'              => 'https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_1280.png',
            'time_out'          => null,
            'type'              => 1,
            'state'             => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 1,
            'username'          => "admin",
            'password'          => bcrypt('admin'),
            'email'             => "admin@prueba_widitrade.com",
            'names'             => "Admin",
            'lastnames'         => "Sys",
            'description'       => "",
            'birth'             => "1995-01-06",
            'state'             => 1,
            'rol_id'            => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('auth_method_users')->insert([
            'id'                => 1,
            'user_id'           => 1,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 2,
            'username'          =>  "creator",
            'password'          => bcrypt('creator'),
            'email'             => "creator@prueba_widitrade.com",
            'names'             => "Daniel",
            'lastnames'         => "Rodriguez",
            'description'       => "Creador de contenido",
            'code'              => "lndWV6cjYx",
            'birth'             => "1995-01-06",
            'state'             => 1,
            'rol_id'            => 2,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('auth_method_users')->insert([
            'id'                => 2,
            'user_id'           => 2,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 3,
            'username'          => "cliente",
            'password'          => bcrypt('cliente'),
            'email'             => "cliente@prueba_widitrade.com",
            'names'             => "Cliente",
            'lastnames'         => "Comprador",
            'code'              => "dW5kZWZpbm",
            'description'       => "Comprador del sistema",
            'birth'             => "1999-01-01",
            'state'             => 1,
            'rol_id'            => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);


        DB::table('auth_method_users')->insert([
            'id'                => 3,
            'user_id'           => 3,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 4,
            'username'          => "extra_user1",
            'password'          => bcrypt('extra_user1'),
            'email'             => "extra_user1@prueba_widitrade.com",
            'names'             => "Extra",
            'lastnames'         => "User1",
            'description'       => "Usuario extra",
            'birth'             => "1992-02-10",
            'state'             => 1,
            'rol_id'            => 2,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method_users')->insert([
            'id'                => 4,
            'user_id'           => 4,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('users')->insert([
            "id"                => 5,
            'username'          => "extra_user2",
            'password'          => bcrypt('extra_user2'),
            'email'             => "extra_user2@prueba_widitrade.com",
            'names'             => "Extra",
            'lastnames'         => "User2",
            'description'       => "Usuario extra",
            'birth'             => "1985-07-15",
            'state'             => 1,
            'rol_id'            => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('auth_method_users')->insert([
            'id'                => 5,
            'user_id'           => 5,
            'auth_method_id'    => 1,
            'time_out'          => null,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);
    }
}
