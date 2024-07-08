<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    public const ROL_ADMIN = 1;
    public const ROL_PROMOTER = 2;
    public const ROL_CLIENT = 3;
    protected $table = 'roles';
}
