import React from 'react';
import { MapPin, ShoppingBag, Bell } from 'lucide-react';

export default function Header({ user, cartCount, onOpenCart }) {
  return (
    <header style={{
      padding: '16px 20px 12px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'var(--color-canvas)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid rgba(229, 216, 202, 0.4)',
      backdropFilter: 'blur(8px)'
    }}>
      {/* Brand & Outlet Selector */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: '800',
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-espresso-dark)',
            letterSpacing: '-0.02em'
          }}>
            bagi kopi.
          </span>
          <span style={{
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary-electric)',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 6px',
            borderRadius: 'var(--radius-full)'
          }}>
            CLUB
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          marginTop: '2px',
          fontSize: '11px',
          color: 'var(--color-text-muted)'
        }}>
          <MapPin size={12} color="var(--color-caramel)" />
          <span style={{ fontWeight: '500' }}>Tebet Timur, Jakarta Selatan</span>
        </div>
      </div>

      {/* Action Icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          aria-label="Notifikasi"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-espresso)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Bell size={18} />
        </button>

        <button 
          onClick={onOpenCart}
          aria-label="Keranjang Belanja"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-espresso)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            position: 'relative',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: 'var(--color-primary-electric)',
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: '700',
              minWidth: '18px',
              height: '18px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              border: '2px solid var(--color-canvas)'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
