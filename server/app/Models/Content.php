<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'contents';

    protected $fillable = ['user_id', 'title', 'description', 'content', 'content_type'];

    public function comments()
    {
        return $this->hasMany('App\Models\Comment', 'content_id', 'id');
    }

    public function favorites()
    {
        return $this->hasMany('App\Models\Favorite', 'content_id', 'id');
    }

    public function ratings()
    {
        return $this->hasMany('App\Models\Rating', 'content_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id', 'id');
    }
}
