<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;

class LandingAndProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeZone = 'America/Guatemala';

        DB::table('landings')->insert([
            'id'                => 1,
            'name'              => 'Landing Page 1',
            'description'       => 'Descripción de la primera landing page',
            'url'               => 'http://localhost:4200/landing/1',
            'user_id'           => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('landings')->insert([
            'id'                => 2,
            'name'              => 'Landing Page 2',
            'description'       => 'Descripción de la segunda landing page',
            'url'               => 'http://localhost:4200/landing/2',
            'user_id'           => 4,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('products')->insert([
            'id'                => 1,
            'name'              => 'Producto 1',
            'url'               => 'http://localhost:4200/product/1',
            'image'             => 'http://via.placeholder.com/150',
            'price'             => 29.99,
            'description'       => 'Descripción del producto 1',
            'rating'            => 4.5,
            'landing_id'        => 1,
            'user_id'           => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('products')->insert([
            'id'                => 2,
            'name'              => 'Producto 2',
            'url'               => 'http://localhost:4200/product/2',
            'image'             => 'http://via.placeholder.com/150',
            'price'             => 49.99,
            'description'       => 'Descripción del producto 2',
            'rating'            => 4.0,
            'landing_id'        => 1,
            'user_id'           => 3,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('products')->insert([
            'id'                => 3,
            'name'              => 'Producto 3',
            'url'               => 'http://localhost:4200/product/3',
            'image'             => 'http://via.placeholder.com/150',
            'price'             => 19.99,
            'description'       => 'Descripción del producto 3',
            'rating'            => 3.5,
            'landing_id'        => 2,
            'user_id'           => 4,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('products')->insert([
            'id'                => 4,
            'name'              => 'Producto 4',
            'url'               => 'http://localhost:4200/product/4',
            'image'             => 'http://via.placeholder.com/150',
            'price'             => 99.99,
            'description'       => 'Descripción del producto 4',
            'rating'            => 5.0,
            'landing_id'        => 2,
            'user_id'           => 4,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);
    }
}
