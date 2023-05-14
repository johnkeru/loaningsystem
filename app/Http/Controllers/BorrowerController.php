<?php

namespace App\Http\Controllers;

use App\Models\Borrower;
use App\Models\History;
use App\Models\Lender;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BorrowerController extends Controller
{
    function create_borrower()
    {
        $history = new History();
        $history->user_id = Auth::id();

        $orig_borrowed = request()->borrowed;
        $borrowed_amount = request()->borrowed_amount;

        $borrower = Auth::user();
        $borrower->is_borrowed = true;

        $lender = User::find(request()->lender_id);
        $lender->lended -= $orig_borrowed;
        $lender->save();

        $lend = Lender::find(request()->lend_id);
        $lend->amount -= $orig_borrowed;
        $lend->save();

        $borrow = Borrower::where('lender_id', request()->lender_id)
            ->where('borrower_id', $borrower->id)
            ->first();

        // update the existing borrower record or create a new one
        if ($borrow) {
            $borrow->borrowed_amount += $borrowed_amount;
            $borrow->borrowed += $borrowed_amount;
            $borrow->save();

            $history->message = "You've borrowed again from " . $lender -> name . " with borrowed amount of " . $borrowed_amount . ".";
            $history->save();
        } else {
            Borrower::create([
                'borrower_id' => $borrower->id,
                'lender_id' => $lender->id,
                'lend_id' => $lend->id,
                'interest' => request()->interest,
                'borrowed' => $orig_borrowed,
                'borrowed_amount' => $borrowed_amount,
            ]);
            $history->message = "You've borrowed from " . $lender -> name . " with borrowed amount of " . $borrowed_amount . ".";
            $history->save();
        }

        $borrower->borrowed += $borrowed_amount;
        $borrower->money += $orig_borrowed;
        $borrower->save();

        // return a JSON response with the lender, lend, and borrower data
        return response()->json([
            'lend' => $lend,
            'lender' => $lender,
            'borrower' => $borrower,
            'borrowed_amount' => $borrowed_amount,

            'borrower_data' => $this->count_borrowers_and_lended_utils($borrower->id)
        ]);
    }

    function count_borrowers_and_lended()
    {
        $user = Auth::user();

        return $this->count_borrowers_and_lended_utils($user->id);
    }

    function payment()
    {

        $history = new History();
        $history->user_id = Auth::id();

        $borrower = Auth::user();
        $lender = User::find(request()->lender_id);
        $payment_amount = request()->payment_amount;

        $borrowed = Borrower::where('lender_id', $lender->id)
            ->where('borrower_id', $borrower->id)
            ->first();

        $borrower->money -= $payment_amount;
        if (($borrower->borrowed - $payment_amount) < 0) {
            $borrower->borrowed = 0;
        } else {
            $borrower->borrowed -= $payment_amount;
        }
        $borrower->is_borrowed = false;

        $lender->money += $payment_amount;

        $borrower->save();
        $lender->save();

        if ($borrowed->borrowed_amount != $payment_amount) {
            if ($payment_amount >= $borrowed->borrowed) {
                $borrowed->borrowed = 0;
            } else {
                $borrowed->borrowed -= $payment_amount;
            }
            $borrowed->borrowed_amount -= $payment_amount;
            $borrowed->save();
            $history->message = "You've repaid with amount of " . $payment_amount . "to " . $lender->name;
            $history->save();
        } else {
            $borrowed->delete();
            $history->message = "You've fully paid to " . $lender->name;
            $history->save();
        }

        return [
            'borrower_data' => $this->count_borrowers_and_lended_utils($borrower->id),
            'user' => $borrower
        ];
    }

    function count_borrowers_and_lended_utils($user_id)
    {
        $borrowers_list = Borrower::where('lender_id', $user_id)->with('userBorrowers')->get();
        $borrowers_count = $borrowers_list->count();

        $borrowed_from_list = Borrower::where('borrower_id', $user_id)->with('userLenders')->get();
        $borrowed_from_count = $borrowed_from_list->count();

        return [
            'borrowers_count' => $borrowers_count,
            'borrowers_list' => $borrowers_list,

            'borrowed_from_count' => $borrowed_from_count,
            'borrowed_from_list' => $borrowed_from_list,
        ];
    }
}