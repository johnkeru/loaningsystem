<?php

use App\Http\Controllers\BorrowerController;
use App\Http\Controllers\LenderController;
use App\Http\Controllers\UserController;
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

Route::post('login', [UserController::class, 'login']); //auth
Route::post('register', [UserController::class, 'register']); //auth
Route::get('test', [UserController::class, 'test']); //auth


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    // USER ENDPOINTS
    Route::post('logout', [UserController::class, 'logout']);
    Route::patch('add_money', [UserController::class, 'add_money']);
    Route::post('upload', [UserController::class, 'upload']);

    // LENDER ENDPOINTS
    Route::post('create_lender', [LenderController::class, 'create_lender']);
    Route::patch('update_lended_amount', [LenderController::class, 'update_lended_amount']);
    Route::get('lenders', [LenderController::class, 'lenders']);
    Route::delete('delete_lender', [LenderController::class, 'delete_lender']);

    // BORROWER ENDPOINTS
    Route::post('create_borrower', [BorrowerController::class, 'create_borrower']);
    Route::get('count_borrowers_and_lended', [BorrowerController::class, 'count_borrowers_and_lended']);
    Route::post('payment', [BorrowerController::class, 'payment']);
});
