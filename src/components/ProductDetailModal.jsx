import React, { useState } from 'react';
import { X, Star, Plus, Minus, Coffee, Sparkles } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [temperature, setTemperature] = useState('ice');
  const [size, setSize] = useState('regular');
  const [sugar, setSugar] = useState('normal');
  const [iceLevel, setIceLevel] = useState('normal');
  const [extraShot, setExtraShot] = useState(false);
  const [extraOatMilk, setExtraOatMilk] = useState(false);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isBeverage = product.category === 'signature' || product.category === 'non-coffee';

  // Calculate dynamic price
  let itemPrice = product.price;
  if (size === 'large') itemPrice += 5000;
  if (extraShot) itemPrice += 5000;
  if (extraOatMilk) itemPrice += 6000;
  const totalPrice = itemPrice * quantity;
  const totalBeans = product.beansReward * quantity;

  const handleAdd = () => {
    onAddToCart({
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      finalPrice: itemPrice,
      totalPrice,
      quantity,
      image: product.image,
      beansReward: totalBeans,
      customizations: {
        temperature: isBeverage ? temperature : null,
        size: isBeverage ? size : null,
        sugar: isBeverage ? sugar : null,
        iceLevel: isBeverage && temperature === 'ice' ? iceLevel : null,
        extraShot,
        extraOatMilk,
        notes
      }
    });
    onClose();
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
      zIndex: 90
    }}>
      <div 
        className="slide-up"
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 'var(--radius-xl)',
          borderTopRightRadius: 'var(--radius-xl)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-modal)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Hero Image & Close */}
        <div style={{ position: 'relative', width: '100%', height: '230px', backgroundColor: '#f5ebe0' }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%)'
          }} />
          <button
            onClick={onClose}
            aria-label="Tutup detail"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-espresso)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <X size={20} />
          </button>

          {/* Badge */}
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            backgroundColor: 'var(--color-primary-electric)',
            color: '#ffffff',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.02em',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {product.tag}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px', flex: 1, paddingBottom: '90px' }}>
          {/* Title & Rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: 'var(--color-espresso-dark)' }}>
                {product.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--color-caramel-gold)', fontSize: '12px', fontWeight: '700' }}>
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating}</span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-text-light)' }}>
                  ({product.reviewsCount} ulasan)
                </span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '800',
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-primary-electric)'
              }}>
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                color: 'var(--color-caramel)',
                fontSize: '11px',
                fontWeight: '700',
                marginTop: '2px'
              }}>
                <Sparkles size={11} />
                <span>+{product.beansReward} Beans</span>
              </div>
            </div>
          </div>

          <p style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
            lineHeight: 1.5
          }}>
            {product.description}
          </p>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-border-light)', margin: '18px 0' }} />

          {/* Beverage Customization Options */}
          {isBeverage && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Temperature */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-espresso)' }}>
                  Suhu Penyajian
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                  {['ice', 'hot'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTemperature(t)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        border: temperature === t ? '2px solid var(--color-primary-electric)' : '1px solid var(--color-border)',
                        backgroundColor: temperature === t ? 'var(--color-primary-light)' : '#ffffff',
                        color: temperature === t ? 'var(--color-primary-electric)' : 'var(--color-text-main)',
                        fontWeight: '600',
                        fontSize: '13px',
                        textTransform: 'capitalize'
                      }}
                    >
                      {t === 'ice' ? '🧊 Dingin (Iced)' : '☕ Panas (Hot)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cup Size */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-espresso)' }}>
                  Ukuran Gelas
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '8px' }}>
                  {[
                    { id: 'regular', name: 'Regular (12 oz)', extra: 0 },
                    { id: 'large', name: 'Large (16 oz)', extra: 5000 }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSize(s.id)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        border: size === s.id ? '2px solid var(--color-primary-electric)' : '1px solid var(--color-border)',
                        backgroundColor: size === s.id ? 'var(--color-primary-light)' : '#ffffff',
                        color: size === s.id ? 'var(--color-primary-electric)' : 'var(--color-text-main)',
                        fontWeight: '600',
                        fontSize: '12px'
                      }}
                    >
                      <div>{s.name}</div>
                      {s.extra > 0 && (
                        <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>
                          +Rp {s.extra.toLocaleString('id-ID')}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sugar Level */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-espresso)' }}>
                  Tingkat Kemanisan
                </label>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {[
                    { id: 'normal', name: '100% Normal' },
                    { id: 'less', name: '50% Less' },
                    { id: 'none', name: '0% No Sugar' }
                  ].map(sg => (
                    <button
                      key={sg.id}
                      onClick={() => setSugar(sg.id)}
                      style={{
                        flex: 1,
                        padding: '8px 4px',
                        borderRadius: 'var(--radius-full)',
                        border: sugar === sg.id ? '1.5px solid var(--color-primary-electric)' : '1px solid var(--color-border)',
                        backgroundColor: sugar === sg.id ? 'var(--color-primary-light)' : '#ffffff',
                        color: sugar === sg.id ? 'var(--color-primary-electric)' : 'var(--color-text-main)',
                        fontSize: '11px',
                        fontWeight: '600'
                      }}
                    >
                      {sg.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Addons */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-espresso)' }}>
                  Tambahan Spesial
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Extra Espresso Shot</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary-electric)' }}>
                        +Rp 5.000
                      </span>
                      <input 
                        type="checkbox" 
                        checked={extraShot} 
                        onChange={e => setExtraShot(e.target.checked)}
                        style={{ accentColor: 'var(--color-primary-electric)', width: '16px', height: '16px' }}
                      />
                    </div>
                  </label>

                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '500' }}>Ganti Oat Milk Premium</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-primary-electric)' }}>
                        +Rp 6.000
                      </span>
                      <input 
                        type="checkbox" 
                        checked={extraOatMilk} 
                        onChange={e => setExtraOatMilk(e.target.checked)}
                        style={{ accentColor: 'var(--color-primary-electric)', width: '16px', height: '16px' }}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div style={{ marginTop: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-espresso)' }}>
              Catatan untuk Barista
            </label>
            <input
              type="text"
              placeholder="Contoh: Pisahkan es batu, hangatkan croissant..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                marginTop: '6px',
                fontSize: '13px',
                outline: 'none',
                backgroundColor: 'var(--color-surface)'
              }}
            />
          </div>
        </div>

        {/* Sticky Bottom Actions */}
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
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.06)'
        }}>
          {/* Stepper */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--color-surface-container)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)'
          }}>
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              style={{
                color: quantity <= 1 ? 'var(--color-text-light)' : 'var(--color-espresso)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Minus size={16} />
            </button>
            <span style={{ fontWeight: '700', fontSize: '14px', minWidth: '18px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => q + 1)}
              style={{ color: 'var(--color-espresso)', display: 'flex', alignItems: 'center' }}
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            style={{
              flex: 1,
              height: '48px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-electric)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px',
              fontWeight: '700',
              fontSize: '14px',
              boxShadow: 'var(--shadow-fab)'
            }}
          >
            <span>Tambah ke Order</span>
            <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
