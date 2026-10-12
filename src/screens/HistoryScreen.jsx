import React, { useState } from 'react';
import { Clock, Star, MessageSquare, CheckCircle2, ChevronRight, X } from 'lucide-react';

export default function HistoryScreen({ transactions, onAddReview }) {
  const [selectedTrxForReview, setSelectedTrxForReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewNote, setReviewNote] = useState('');

  const submitReview = () => {
    if (!selectedTrxForReview) return;
    onAddReview(selectedTrxForReview.id, rating, reviewNote);
    setSelectedTrxForReview(null);
    setReviewNote('');
    alert('Terima kasih! Ulasan Anda telah berhasil dikirim ke Barista Bagi Kopi.');
  };

  return (
    <div className="fade-in" style={{ padding: '16px 20px 95px 20px' }}>
      {/* Title */}
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '22px', color: 'var(--color-espresso-dark)' }}>
          Riwayat Transaksi
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Daftar pesanan & ulasan kopi Anda
        </p>
      </div>

      {/* Transaction List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {transactions.map(trx => (
          <div
            key={trx.id}
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{
                  fontSize: '10px',
                  fontWeight: '700',
                  color: 'var(--color-primary-electric)',
                  backgroundColor: 'var(--color-primary-light)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {trx.type}
                </span>
                <h3 style={{ fontSize: '15px', color: 'var(--color-espresso-dark)', marginTop: '4px' }}>
                  {trx.outlet}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                  <Clock size={12} />
                  <span>{trx.date}</span>
                </div>
              </div>

              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <CheckCircle2 size={13} />
                <span>{trx.status}</span>
              </span>
            </div>

            {/* Items summary */}
            <div style={{
              backgroundColor: 'var(--color-surface-container-low)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px'
            }}>
              {trx.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-espresso)' }}>
                  <span>{it.qty}x {it.name}</span>
                  <span style={{ fontWeight: '600' }}>Rp {it.price.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            {/* Total and beans */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '4px'
            }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Total Bayar: </span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-espresso-dark)' }}>
                  Rp {trx.totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-caramel)',
                backgroundColor: 'var(--color-caramel-light)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}>
                +{trx.beansEarned} Beans
              </span>
            </div>

            {/* Review Status or Action */}
            <div style={{
              borderTop: '1px solid var(--color-border-light)',
              paddingTop: '8px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {trx.reviewed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-caramel-gold)' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(trx.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '11px' }}>
                    "{trx.reviewNote || 'Ulasan telah diberikan'}"
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedTrxForReview(trx);
                    setRating(5);
                    setReviewNote('');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: 'var(--color-primary-electric)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-primary-light)'
                  }}
                >
                  <MessageSquare size={14} />
                  <span>Beri Ulasan Rasa & Pelayanan</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {selectedTrxForReview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(34, 28, 24, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '20px'
        }}>
          <div 
            className="slide-up"
            style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              padding: '22px',
              boxShadow: 'var(--shadow-modal)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--color-espresso-dark)' }}>
                Ulasan Kopi & Pelayanan
              </h3>
              <button onClick={() => setSelectedTrxForReview(null)}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '14px' }}>
              Bagaimana pengalaman pesanan Anda di <strong>{selectedTrxForReview.outlet}</strong>?
            </p>

            {/* Star Rating Selector */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  style={{ color: star <= rating ? 'var(--color-caramel-gold)' : 'var(--color-surface-dim)' }}
                >
                  <Star size={32} fill={star <= rating ? 'currentColor' : 'none'} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            <textarea
              placeholder="Ceritakan rasa kopi, keramahan barista, atau suasana outlet..."
              value={reviewNote}
              onChange={e => setReviewNote(e.target.value)}
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
                marginBottom: '16px'
              }}
            />

            <button
              onClick={submitReview}
              style={{
                width: '100%',
                height: '44px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-electric)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '13px',
                boxShadow: 'var(--shadow-fab)'
              }}
            >
              Kirim Ulasan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
