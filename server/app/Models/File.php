<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = 'files';

    protected $fillable = ['name', 'type', 'path', 'size', 'user_id', 'landing_id'];

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }

    public function landing()
    {
        return $this->belongsTo('App\Models\Landing', 'landing_id', 'id');
    }
}
