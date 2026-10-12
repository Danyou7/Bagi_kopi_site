import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartModal({
  cartItems,
  onClose,
  onRemoveItem,
  onClearCart,
  onCheckoutSuccess
}) {
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'pickup'
  const [appliedVoucher, setAppliedVoucher] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const discount = appliedVoucher ? Math.min(15000, subtotal) : 0;
  const tax = Math.round((subtotal - discount) * 0.1);
  const total = subtotal - discount + tax;
  const totalBeans = cartItems.reduce((acc, item) => acc + item.beansReward, 0);

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setIsSubmitting(false);
      onCheckoutSuccess({
        items: cartItems,
        totalPrice: total,
        beansEarned: totalBeans,
        orderType
      });
      onClose();
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(34, 28, 24, 0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      zIndex: 95
    }}>
      <div 
        className="slide-up"
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '88vh',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: '#ffffff',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--color-primary-electric)" />
            <h2 style={{ fontSize: '18px', color: 'var(--color-espresso-dark)' }}>
              Keranjang Order ({cartItems.length})
            </h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Tutup keranjang"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-container)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-espresso)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px', flex: 1, paddingBottom: '110px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}>Keranjang Anda masih kosong</p>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary-electric)',
                  fontWeight: '700',
                  fontSize: '13px'
                }}
              >
                Pilih Kopi Sekarang
              </button>
            </div>
          ) : (
            <>
              {/* Dine-in vs Takeaway Toggle */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: 'var(--color-surface-container)',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                marginBottom: '16px'
              }}>
                <button
                  onClick={() => setOrderType('dine-in')}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: orderType === 'dine-in' ? '#ffffff' : 'transparent',
                    color: orderType === 'dine-in' ? 'var(--color-espresso)' : 'var(--color-text-muted)',
                    fontWeight: '700',
                    fontSize: '12px',
                    boxShadow: orderType === 'dine-in' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  🍽️ Minum di Tempat (Dine-in)
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  style={{
                    padding: '8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: orderType === 'pickup' ? '#ffffff' : 'transparent',
                    color: orderType === 'pickup' ? 'var(--color-espresso)' : 'var(--color-text-muted)',
                    fontWeight: '700',
                    fontSize: '12px',
                    boxShadow: orderType === 'pickup' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  🛍️ Bawa Pulang (Pick-up)
                </button>
              </div>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {cartItems.map((item, index) => (
                  <div 
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-surface-container-low)',
                      border: '1px solid var(--color-border-light)'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '14px', color: 'var(--color-espresso-dark)' }}>
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemoveItem(index)}
                          aria-label="Hapus item"
                          style={{ color: 'var(--color-danger)' }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      {/* Customization Details */}
                      <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                        {item.customizations.temperature && (
                          <span>{item.customizations.temperature === 'ice' ? 'Iced' : 'Hot'} • </span>
                        )}
                        {item.customizations.size && (
                          <span>{item.customizations.size} • </span>
                        )}
                        {item.customizations.sugar && (
                          <span>Gula {item.customizations.sugar}</span>
                        )}
                        {item.customizations.extraShot && <span> • +Extra Shot</span>}
                        {item.customizations.extraOatMilk && <span> • +Oat Milk</span>}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                          Qty: <strong>{item.quantity}</strong>
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-primary-electric)' }}>
                          Rp {item.totalPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Selector */}
              <div style={{
                marginTop: '18px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--color-caramel)',
                backgroundColor: 'var(--color-caramel-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-caramel)' }}>
                    {appliedVoucher ? '🎉 Voucher Diskon Rp 15.000 Terpakai' : 'Punya Voucher Diskon?'}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                    {appliedVoucher ? 'Hemat Rp 15.000 dari total belanja' : 'Gunakan voucher membership Anda'}
                  </div>
                </div>
                <button
                  onClick={() => setAppliedVoucher(!appliedVoucher)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: appliedVoucher ? 'var(--color-danger)' : 'var(--color-espresso)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700'
                  }}
                >
                  {appliedVoucher ? 'Lepas' : 'Pakai'}
                </button>
              </div>

              {/* Price Breakdown */}
              <div style={{
                marginTop: '18px',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-surface-container)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Subtotal Produk</span>
                  <span style={{ fontWeight: '600' }}>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {appliedVoucher && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-success)' }}>
                    <span>Diskon Voucher</span>
                    <span style={{ fontWeight: '700' }}>- Rp {discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>PB1 / Pajak Resto (10%)</span>
                  <span style={{ fontWeight: '600' }}>Rp {tax.toLocaleString('id-ID')}</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '4px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '800' }}>
                  <span style={{ color: 'var(--color-espresso-dark)' }}>Total Pembayaran</span>
                  <span style={{ color: 'var(--color-primary-electric)' }}>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: 'var(--color-caramel)',
                  fontWeight: '700',
                  fontSize: '11px',
                  marginTop: '2px'
                }}>
                  <Sparkles size={12} />
                  <span>Dapatkan +{totalBeans} Bagi Beans dari pesanan ini!</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sticky Checkout Bar */}
        {cartItems.length > 0 && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: '440px',
            margin: '0 auto',
            padding: '14px 20px',
            backgroundColor: '#ffffff',
            borderTop: '1px solid var(--color-border)',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
          }}>
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-primary-electric)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: '700',
                fontSize: '14px',
                boxShadow: 'var(--shadow-fab)',
                opacity: isSubmitting ? 0.8 : 1
              }}
            >
              {isSubmitting ? (
                <span>Memproses Pesanan...</span>
              ) : (
                <>
                  <span>Bayar & Kirim ke Barista</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
