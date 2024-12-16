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
        Schema::create('activities', function (Blueprint $table) {
            $table->id();
            $table->string('activity_name');
            $table->text('description')->nullable();
            $table->date('date');
            $table->integer('duration');
            $table->timestamps();
            
        });
    
    
    Schema::table('activities', function (Blueprint $table) {
        $table->foreignId('user_id')->constrained()->onDelete('cascade');  
        });
}


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('activities', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('activities');    }
};
