<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reminder extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = ['description', 'date', 'user_id'];

    /**
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'description' => 'string',
        'date' => 'string',
        'user_id' => 'integer',
    ];

    /**
     * @var array
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
