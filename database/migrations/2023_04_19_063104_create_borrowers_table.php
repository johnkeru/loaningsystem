<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('borrowers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('borrower_id');
            $table->foreignId('lender_id');
            $table->foreignId('lend_id');
            $table->integer('interest');
            $table->double('borrowed'); // principal
            $table->double('borrowed_amount'); // principal + (principal * interest)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('borrowers');
    }
};

// php artisan migrate:refresh --path=/database/migrations/2023_04_19_063104_create_borrowers_table.php