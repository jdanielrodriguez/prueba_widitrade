<?php

namespace App\Http\Controllers;

use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Mail;

define('CORREO', 'send@prueba_widitrade.com');
define('EMPRESA', 'Prueba Widitrade');
abstract class EmailsController extends Controller
{
    const CORREO = 'send@prueba_widitrade.com';
    const EMPRESA = 'Prueba Widitrade';
    public static function enviarConfirm($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            $names = ($objectSee->names != '' || $objectSee->lastnames != '') ? $objectSee->names . ' ' . $objectSee->lastnames : $objectSee->username;
            Mail::send(
                'emails.confirm',
                [
                    'empresa' => self::EMPRESA,
                    'url' => 'https://www.prueba_widitrade.com/login',
                    'app' => 'http://me.JoseDanielRodriguez.gt',
                    'password' => $objectRequest->user->password,
                    'username' => $objectSee->username,
                    'email' => $objectSee->email,
                    'name' => $names,
                ],
                function (Message $message) use ($objectSee, $names) {
                    $message->from(self::CORREO, self::EMPRESA)
                        ->sender(self::CORREO, self::EMPRESA)
                        ->to($objectSee->email, $names)
                        ->replyTo(self::CORREO, self::EMPRESA)
                        ->subject('Usuario Creado');
                }
            );
        }
    }

    public static function enviarRecovery($objectUpdate, $pass)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send(
                'emails.recovery',
                [
                    'empresa' => $objectUpdate->empresaMostrar,
                    'url' => $objectUpdate->url,
                    'password' => $pass,
                    'username' => $objectUpdate->username,
                    'email' => $objectUpdate->email,
                    'name' => $objectUpdate->names
                ],
                function (Message $message) use ($objectUpdate) {
                    $message->from($objectUpdate->email, $objectUpdate->names)
                        ->sender($objectUpdate->email, $objectUpdate->names)
                        ->to($objectUpdate->email, $objectUpdate->names)
                        ->replyTo($objectUpdate->email, $objectUpdate->names)
                        ->subject('Contraseña Reestablecida');
                }
            );
        }
    }

    public static function enviarRestoreLink($objectUpdate, $uuid)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send(
                'emails.restore',
                [
                    'empresa' => self::EMPRESA,
                    'url' => 'https://www.prueba_widitrade.com/auth/',
                    'uuid' => $uuid,
                    'username' => $objectUpdate->username,
                    'email' => $objectUpdate->email,
                    'name' => $objectUpdate->names
                ],
                function (Message $message) use ($objectUpdate) {
                    $message->from($objectUpdate->email, $objectUpdate->names)
                        ->sender($objectUpdate->email, $objectUpdate->names)
                        ->to($objectUpdate->email, $objectUpdate->names)
                        ->replyTo($objectUpdate->email, $objectUpdate->names)
                        ->subject('Contraseña Reestablecida');
                }
            );
        }
    }

    public static function enviarFactura($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send(
                'emails.factura',
                [
                    'empresa' => self::EMPRESA,
                    'url' => 'https://www.prueba_widitrade.com/inicio',
                    'app' => 'http://me.JoseDanielRodriguez.gt',
                    'password' => $objectRequest->user->password,
                    'username' => $objectSee->username,
                    'email' => $objectSee->email,
                    'name' => $objectSee->names . ' ' . $objectSee->lastnames,
                ],
                function (Message $message) use ($objectSee) {
                    $message->from(self::CORREO, self::EMPRESA)
                        ->sender(self::CORREO, self::EMPRESA)
                        ->to($objectSee->email, $objectSee->names . ' ' . $objectSee->lastnames)
                        ->replyTo(self::CORREO, self::EMPRESA)
                        ->subject('Usuario Creado');
                }
            );
        }
    }

    public static function enviarPago($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send('emails.pago', ['empresa' => self::EMPRESA, 'url' => 'https://www.prueba_widitrade.com/' . ($objectRequest->proveedor ? $objectRequest->proveedor->names . "/inicio" : "inicio"), 'app' => 'http://me.JoseDanielRodriguez.gt', 'password' => $objectRequest->user->password, 'username' => $objectSee->username, 'email' => $objectSee->email, 'name' => $objectSee->names . ' ' . $objectSee->lastnames,], function (Message $message) use ($objectSee) {
                $message->from(self::CORREO, self::EMPRESA)
                    ->sender(self::CORREO, self::EMPRESA)
                    ->to($objectSee->email, $objectSee->names . ' ' . $objectSee->lastnames)
                    ->replyTo(self::CORREO, self::EMPRESA)
                    ->subject('Usuario Creado');
            });
        }
    }

    public static function enviarConfirmacionVenta($objectRequest, $objectSee)
    {
        if (env('MAIL_USERNAME') && env('MAIL_DRIVER') == 'smtp') {
            Mail::send('emails.facturaConfirm', ['empresa' => self::EMPRESA, 'url' => 'https://www.prueba_widitrade.com/' . ($objectRequest->proveedor ? $objectRequest->proveedor->names . "/inicio" : "inicio"), 'app' => 'http://me.JoseDanielRodriguez.gt', 'password' => $objectRequest->user->password, 'username' => $objectSee->username, 'email' => $objectSee->email, 'name' => $objectSee->names . ' ' . $objectSee->lastnames,], function (Message $message) use ($objectSee) {
                $message->from(self::CORREO, self::EMPRESA)
                    ->sender(self::CORREO, self::EMPRESA)
                    ->to($objectSee->email, $objectSee->names . ' ' . $objectSee->lastnames)
                    ->replyTo(self::CORREO, self::EMPRESA)
                    ->subject('Usuario Creado');
            });
        }
    }
}
