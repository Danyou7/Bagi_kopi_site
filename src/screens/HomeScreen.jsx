import React from 'react';
import { Sparkles, QrCode, ArrowRight, Zap, Coffee, Clock, ChevronRight } from 'lucide-react';

export default function HomeScreen({ user, products, onSelectProduct, onOpenQR, onNavigateToMenu, onNavigateToRewards }) {
  const tierProgressPercent = Math.min(100, Math.round((user.beans / user.nextTierTarget) * 100));
  const bestSellers = products.slice(0, 3);

  return (
    <div className="fade-in" style={{ padding: '16px 20px 90px 20px' }}>
      {/* Membership Card */}
      <div style={{
        background: 'linear-gradient(135deg, #3a281e 0%, #201b14 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(229, 216, 202, 0.15)'
      }}>
        {/* Subtle decorative glow */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 119, 36, 0.35) 0%, transparent 70%)'
        }} />

        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(217, 119, 36, 0.25)',
              color: '#f59e0b',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontSize: '10px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <Sparkles size={11} />
              <span>{user.tier}</span>
            </div>
            <h2 style={{ fontSize: '18px', marginTop: '6px', color: '#ffffff' }}>
              {user.name}
            </h2>
            <div style={{ fontSize: '11px', color: '#c9bba8', fontFamily: 'monospace' }}>
              ID: {user.memberId}
            </div>
          </div>

          <button
            onClick={onOpenQR}
            aria-label="Buka QR Kasir"
            style={{
              backgroundColor: '#ffffff',
              color: 'var(--color-primary-electric)',
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
          >
            <QrCode size={24} />
          </button>
        </div>

        {/* Beans Balance */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '11px', color: '#d5c7b7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Saldo Bagi Beans
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
            <span style={{
              fontSize: '32px',
              fontWeight: '800',
              fontFamily: 'var(--font-heading)',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              {user.beans.toLocaleString('id-ID')}
            </span>
            <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '700' }}>Beans</span>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div style={{ marginTop: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#d5c7b7', marginBottom: '4px' }}>
            <span>Target {user.nextTierName}</span>
            <span>{user.beans} / {user.nextTierTarget}</span>
          </div>
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${tierProgressPercent}%`,
              height: '100%',
              backgroundColor: 'var(--color-caramel-gold)',
              borderRadius: '9999px',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ fontSize: '10px', color: '#b8a896', marginTop: '4px' }}>
            Tinggal <strong>{user.nextTierTarget - user.beans} Beans lagi</strong> untuk naik level!
          </div>
        </div>

        {/* Quick Card Action */}
        <div style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '11px', color: '#e5d8ca' }}>
            Ada <strong>{user.vouchersCount} Voucher Diskon</strong> siap pakai
          </span>
          <button
            onClick={onNavigateToRewards}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: '700',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span>Tukar</span>
            <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        marginTop: '18px'
      }}>
        {[
          { label: 'Pesan Kopi', icon: Coffee, action: onNavigateToMenu, color: '#1e60ff' },
          { label: 'Tukar Poin', icon: Sparkles, action: onNavigateToRewards, color: '#d97724' },
          { label: 'Scan Kasir', icon: QrCode, action: onOpenQR, color: '#3a281e' },
          { label: 'Jam Buka', icon: Clock, action: () => alert('Outlet Tebet Timur buka setiap hari: 07:00 - 23:00 WIB'), color: '#16a34a' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px 6px',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border-light)'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: `${item.color}15`,
                color: item.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '6px'
              }}>
                <Icon size={20} strokeWidth={2.2} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-main)' }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Banner */}
      <div style={{
        marginTop: '22px',
        backgroundColor: 'var(--color-primary-electric)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-fab)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 2, maxWidth: '240px' }}>
          <span style={{
            backgroundColor: '#ffffff',
            color: 'var(--color-primary-electric)',
            fontSize: '9px',
            fontWeight: '800',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            PROMO KHUSUS HARI INI
          </span>
          <h3 style={{ fontSize: '16px', marginTop: '6px', color: '#ffffff' }}>
            Double Beans Weekend!
          </h3>
          <p style={{ fontSize: '11px', color: '#e0ebff', marginTop: '2px' }}>
            Dapatkan x2 poin Bagi Beans untuk setiap pembelian varian Signature.
          </p>
        </div>
        <button
          onClick={onNavigateToMenu}
          aria-label="Pesan promo"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ffffff',
            color: 'var(--color-primary-electric)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            zIndex: 2
          }}
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Best Sellers Section */}
      <div style={{ marginTop: '26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '17px', color: 'var(--color-espresso-dark)' }}>
              Pilihan Favorit Pelanggan
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
              Menu paling banyak dipesan minggu ini
            </p>
          </div>
          <button
            onClick={onNavigateToMenu}
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--color-primary-electric)'
            }}
          >
            Lihat Semua
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {bestSellers.map(product => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid var(--color-border-light)',
                cursor: 'pointer'
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '78px',
                  height: '78px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: 'var(--color-caramel-light)',
                  color: 'var(--color-caramel)',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '2px'
                }}>
                  {product.tag}
                </div>
                <h4 style={{ fontSize: '15px', color: 'var(--color-espresso-dark)' }}>
                  {product.name}
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px', lineClamp: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                  {product.description}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--color-primary-electric)' }}>
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '700',
                    color: 'var(--color-caramel)',
                    backgroundColor: 'var(--color-surface-container)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    +{product.beansReward} Beans
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
