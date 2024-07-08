<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;

class ContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $timeZone = 'America/Guatemala';

        DB::table('contents')->insert([
            'id'                => 1,
            'user_id'           => 2,
            'title'             => 'Primer Contenido',
            'description'       => 'Descripción del primer contenido',
            'slug'              => $this->clean('Este es el contenido del primer contenido'),
            'content'           => 'Este es el contenido del primer contenido',
            'content_type'      => 'texto',
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('contents')->insert([
            'id'                => 2,
            'user_id'           => 4,
            'title'             => 'Segundo Contenido',
            'description'       => 'Descripción del segundo contenido',
            'slug'              => $this->clean('Este es el contenido del segundo contenido'),
            'content'           => 'Este es el contenido del segundo contenido',
            'content_type'      => 'texto',
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('comments')->insert([
            'id'                => 1,
            'content_id'        => 1,
            'user_id'           => 3,
            'comment'           => 'Este es un comentario en el primer contenido',
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('comments')->insert([
            'id'                => 2,
            'content_id'        => 2,
            'user_id'           => 5,
            'comment'           => 'Este es un comentario en el segundo contenido',
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('favorites')->insert([
            'id'                => 1,
            'user_id'           => 3,
            'content_id'        => 1,
            'reaction'          => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('favorites')->insert([
            'id'                => 2,
            'user_id'           => 5,
            'reaction'          => 1,
            'content_id'        => 2,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('rating')->insert([
            'id'                => 1,
            'user_id'           => 3,
            'content_id'        => 1,
            'rating'            => 1,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);

        DB::table('rating')->insert([
            'id'                => 2,
            'user_id'           => 5,
            'rating'            => 5,
            'content_id'        => 2,
            'created_at'        => Carbon::now($timeZone),
            'updated_at'        => Carbon::now($timeZone)
        ]);
    }

    private function clean($string)
    {
        $string = $this->cleanString(strtolower(str_replace(' ', '-', $string))); // Replaces all spaces with hyphens.

        return preg_replace('/[^a-z0-9\-]/', '', $string); // Removes special chars.
    }

    private function cleanString($text) {
        $utf8 = array(
            '/[áàâãªä]/u'   =>   'a',
            '/[ÁÀÂÃÄ]/u'    =>   'A',
            '/[ÍÌÎÏ]/u'     =>   'I',
            '/[íìîï]/u'     =>   'i',
            '/[éèêë]/u'     =>   'e',
            '/[ÉÈÊË]/u'     =>   'E',
            '/[óòôõºö]/u'   =>   'o',
            '/[ÓÒÔÕÖ]/u'    =>   'O',
            '/[úùûü]/u'     =>   'u',
            '/[ÚÙÛÜ]/u'     =>   'U',
            '/ç/'           =>   'c',
            '/Ç/'           =>   'C',
            '/ñ/'           =>   'n',
            '/Ñ/'           =>   'N',
            '/–/'           =>   '-', // UTF-8 hyphen to "normal" hyphen
            '/[’‘‹›‚]/u'    =>   ' ', // Literally a single quote
            '/[“”«»„]/u'    =>   ' ', // Double quote
            '/ /'           =>   ' ', // nonbreaking space (equiv. to 0x160)
        );
        return preg_replace(array_keys($utf8), array_values($utf8), $text);
    }
}
