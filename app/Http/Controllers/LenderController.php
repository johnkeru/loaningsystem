<?php

namespace App\Http\Controllers;

use App\Models\Lender;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LenderController extends Controller
{

    public function lenders()
    {
        $lenders = Lender::orderBy('created_at', 'desc')->get();
        return response()->json(['lenders' => $lenders]);
    }
    public function create_lender()
    {
        $user = Auth::user();
        $lender = new Lender();
        $lender->amount = request()->amount;
        $lender->lender_name = request()->lender_name;
        $lender->lender_email = request()->lender_email;
        $lender->lender_avatar = request()->lender_avatar;
        $lender->interest = request()->interest;
        $lender->user_id = $user->id;

        $user->is_lended = true;
        $user->lended = request()->amount;
        $user->money -= request()->amount;
        $user->save();
        $lender->save();
        return response()->json(['lender' => $lender, 'user' => $user]);
    }

    public function update_lended_amount()
    {
        $user = Auth::user();
        $lender = Lender::where('user_id', Auth::user()->id)->first();
        $lender->amount += request()->amount;
        $lender->interest = request()->interest;
        $user->lended += request()->amount;
        $user->money -= request()->amount;
        $user->save();
        $lender->save();
        return response()->json(['lender' => $lender, 'user' => $user]);
    }

    public function delete_lender()
    {
        $lender = Lender::where('user_id', Auth::user()->id)->first();
        $user = Auth::user();
        $user->is_lended = false;
        $user->lended = 0;
        $user->money += request()->amount;
        $user->save();
        $lender->delete();
        return response()->json(['user' => $user, 'amount' => request()->amount]);
    }
}
