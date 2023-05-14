<?php

namespace App\Http\Controllers;

use App\Models\History;
use Illuminate\Support\Facades\Auth;

class HistoryController extends Controller
{
    public function get_histories()
    {
        $histories = History::where('user_id', Auth::id())->get();
        return ['histories' => $histories];
    }

    public function deleteHistory($id)
    {
        $history = History::find($id);
        $history->delete();
        return ['message' => 'History Deleted Successfully'];
    }
}
