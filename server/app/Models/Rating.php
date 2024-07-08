<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    protected $table = 'rating';

    protected $fillable = ['content_id', 'user_id', 'rating'];

    public function content()
    {
        return $this->belongsTo('App\Models\Content', 'content_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
