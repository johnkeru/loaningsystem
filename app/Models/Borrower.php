<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Borrower extends Model
{
    use HasFactory;
    public function userBorrowers()
    {
        return $this->belongsTo(User::class, 'borrower_id');
    }
    public function userLenders()
    {
        return $this->belongsTo(User::class, 'lender_id');
    }
    protected $fillable = [
        'borrower_id',
        'lender_id',
        'lend_id',
        'borrowed_amount',
        'interest',
        'borrowed'
    ];
}
