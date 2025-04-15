<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demandes extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_demande';

    protected $fillable = [
        'CIN',
        'date_demande',
        'Archive',
        'status'
    ];

    protected $casts = [
        'date_demande' => 'datetime',
        'Archive' => 'boolean'
    ];

    // Status constants
    public const STATUS_PENDING = 'en_attente';
    public const STATUS_APPROVED = 'approuvé';
    public const STATUS_REJECTED = 'rejeté';

    /**
     * Get the citoyen who made this demande
     */
    public function citoyen()
    {
        return $this->belongsTo(Citoyen::class, 'CIN', 'CIN');
    }

    /**
     * Scope for archived demandes
     */
    public function scopeArchived($query)
    {
        return $query->where('Archive', true);
    }

    /**
     * Scope for active demandes
     */
    public function scopeActive($query)
    {
        return $query->where('Archive', false);
    }

    /**
     * Check if demande is pending
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if demande is approved
     */
    public function isApproved(): bool
    {
        return $this->status === self::STATUS_APPROVED;
    }

    /**
     * Check if demande is rejected
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }
}