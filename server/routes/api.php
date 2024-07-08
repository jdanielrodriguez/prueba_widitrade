<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['jwt.auth']], function () {
    Route::post('content', [App\Http\Controllers\ContentController::class, 'store']);
    Route::put('content/{id}', [App\Http\Controllers\ContentController::class, 'update']);
    Route::delete('content/{id}', [App\Http\Controllers\ContentController::class, 'destroy']);

    Route::post('content/{content_id}/comment', [App\Http\Controllers\ReactionsController::class, 'store']);
    Route::get('content/{content_id}/comment', [App\Http\Controllers\ReactionsController::class, 'index']);
    Route::delete('comment/{id}', [App\Http\Controllers\ReactionsController::class, 'destroy']);

    Route::post('content/{content_id}/favorite', [App\Http\Controllers\ReactionsController::class, 'addFavorite']);
    Route::get('favorites', [App\Http\Controllers\ReactionsController::class, 'getFavorites']);

    Route::post('content/{content_id}/rating', [App\Http\Controllers\ReactionsController::class, 'addRating']);
    Route::get('ratings', [App\Http\Controllers\ReactionsController::class, 'getRatings']);

    // Route::post('landing', [App\Http\Controllers\LandingController::class, 'store']);
    // Route::get('landings', [App\Http\Controllers\LandingController::class, 'index']);
    // Route::get('landing/{id}/products', [App\Http\Controllers\LandingController::class, 'landingProducts']);
    // Route::get('landing/{id}', [App\Http\Controllers\LandingController::class, 'show']);
    // Route::put('landing/{id}', [App\Http\Controllers\LandingController::class, 'update']);
    // Route::delete('landing/{id}', [App\Http\Controllers\LandingController::class, 'destroy']);

    // Route::post('products/import', [App\Http\Controllers\LandingController::class, 'import']);

    Route::post('file/upload', [App\Http\Controllers\FileController::class, 'upload']);
    Route::post('file/save', [App\Http\Controllers\FileController::class, 'saveFile']);
    Route::get('files', [App\Http\Controllers\FileController::class, 'index']);
    Route::get('file/{id}', [App\Http\Controllers\FileController::class, 'show']);
    Route::delete('file/{id}', [App\Http\Controllers\FileController::class, 'destroy']);

    Route::post('change-password', [App\Http\Controllers\AuthenticationController::class, 'changePassword']);
    Route::get('users/{id}', [App\Http\Controllers\UsersController::class, 'show']);
    Route::post('logout', [App\Http\Controllers\AuthenticationController::class, 'logout']);
});
Route::post('signup', [App\Http\Controllers\AuthenticationController::class, 'signUp']);
Route::post('login', [App\Http\Controllers\AuthenticationController::class, 'login']);
Route::post('reset-password', [App\Http\Controllers\AuthenticationController::class, 'sendNewPassword']);
Route::post('restore-password', [App\Http\Controllers\AuthenticationController::class, 'restorePassword']);
Route::post('recovery-password', [App\Http\Controllers\AuthenticationController::class, 'recoveryPassword']);
Route::post('validate-captcha', [App\Http\Controllers\AuthenticationController::class, 'validarCaptcha']);

Route::get('content', [App\Http\Controllers\ContentController::class, 'index']);
Route::get('content/{slug}', [App\Http\Controllers\ContentController::class, 'getBySlug']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
