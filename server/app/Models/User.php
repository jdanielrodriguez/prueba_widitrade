<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    public const AUTH_METHOD_SIMPLE = 1;
    public const AUTH_METHOD_GOOGLE = 2;
    public const AUTH_METHOD_FACEBOOK = 3;
    public const AUTH_METHOD_TIKTOK = 4;
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function contents()
    {
        return $this->hasMany('App\Models\Content', 'user_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment', 'user_id', 'id');
    }

    public function favorites()
    {
        return $this->hasMany('App\Models\Favorite', 'user_id', 'id');
    }

    public function ratings()
    {
        return $this->hasMany('App\Models\Rating', 'user_id', 'id');
    }
}
