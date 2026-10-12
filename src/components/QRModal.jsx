import React, { useState, useEffect } from 'react';
import { X, Sparkles, RefreshCw, ShieldCheck, Sun } from 'lucide-react';

export default function QRModal({ user, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(50);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(34, 28, 24, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div 
        className="slide-up"
        style={{
          width: '100%',
          maxWidth: '360px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-modal)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Header Card */}
        <div style={{
          backgroundColor: 'var(--color-espresso)',
          color: '#ffffff',
          padding: '20px 20px 16px 20px',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            aria-label="Tutup QR"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <X size={18} />
          </button>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'rgba(217, 119, 36, 0.25)',
            color: '#fbbf24',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            marginBottom: '6px'
          }}>
            <Sparkles size={12} />
            <span>{user.tier} Member</span>
          </div>

          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff' }}>
            {user.name}
          </h2>
          <p style={{ fontSize: '12px', color: '#e5d8ca', marginTop: '2px' }}>
            ID: <span style={{ fontFamily: 'monospace', fontWeight: '700' }}>{user.memberId}</span>
          </p>
        </div>

        {/* QR & Barcode Section */}
        <div style={{
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff'
        }}>
          {/* Simulated High-Res Crisp QR Code */}
          <div style={{
            padding: '12px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '2px dashed var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '16px'
          }}>
            <svg width="190" height="190" viewBox="0 0 190 190">
              <rect width="190" height="190" fill="white" />
              {/* Corner 1 */}
              <rect x="15" y="15" width="45" height="45" rx="8" fill="#1e60ff" />
              <rect x="23" y="23" width="29" height="29" rx="4" fill="white" />
              <rect x="29" y="29" width="17" height="17" rx="2" fill="#1e60ff" />
              
              {/* Corner 2 */}
              <rect x="130" y="15" width="45" height="45" rx="8" fill="#1e60ff" />
              <rect x="138" y="23" width="29" height="29" rx="4" fill="white" />
              <rect x="144" y="29" width="17" height="17" rx="2" fill="#1e60ff" />
              
              {/* Corner 3 */}
              <rect x="15" y="130" width="45" height="45" rx="8" fill="#1e60ff" />
              <rect x="23" y="138" width="29" height="29" rx="4" fill="white" />
              <rect x="29" y="144" width="17" height="17" rx="2" fill="#1e60ff" />
              
              {/* Pattern Blocks */}
              <rect x="70" y="25" width="12" height="12" fill="#201b14" />
              <rect x="90" y="15" width="12" height="25" fill="#201b14" />
              <rect x="110" y="35" width="10" height="10" fill="#201b14" />
              
              <rect x="70" y="70" width="50" height="50" rx="8" fill="#1e60ff" />
              <rect x="80" y="80" width="30" height="30" rx="4" fill="white" />
              <circle cx="95" cy="95" r="7" fill="#1e60ff" />
              
              <rect x="25" y="75" width="25" height="10" fill="#201b14" />
              <rect x="35" y="95" width="15" height="20" fill="#201b14" />
              <rect x="135" y="75" width="25" height="12" fill="#201b14" />
              <rect x="145" y="100" width="15" height="15" fill="#201b14" />

              <rect x="70" y="135" width="20" height="10" fill="#201b14" />
              <rect x="100" y="145" width="15" height="25" fill="#201b14" />
              <rect x="130" y="135" width="30" height="12" fill="#201b14" />
              <rect x="145" y="155" width="20" height="18" fill="#201b14" />
            </svg>
          </div>

          {/* Barcode Graphic */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            height: '36px',
            marginBottom: '4px'
          }}>
            {[4, 2, 6, 2, 5, 2, 8, 3, 2, 5, 3, 7, 2, 4, 6, 2, 3, 5, 2, 7, 3].map((w, i) => (
              <div 
                key={i} 
                style={{
                  width: `${w}px`,
                  height: '100%',
                  backgroundColor: '#201b14',
                  borderRadius: '1px'
                }} 
              />
            ))}
          </div>

          <div style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            fontWeight: '700',
            letterSpacing: '2px',
            color: 'var(--color-espresso)'
          }}>
            9 8 4 2 1 0 8 8 2 9
          </div>

          {/* Dynamic Refresh Timer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            marginTop: '12px'
          }}>
            <RefreshCw size={12} className="spin" />
            <span>Kode dinamis diperbarui dalam <strong>{secondsLeft}s</strong></span>
          </div>
        </div>

        {/* Footer Notes */}
        <div style={{
          backgroundColor: 'var(--color-surface-container)',
          padding: '12px 18px',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--color-text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sun size={13} color="var(--color-caramel)" />
            <span>Tingkatkan kecerahan layar</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontWeight: '600' }}>
            <ShieldCheck size={13} />
            <span>Kasir Terverifikasi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
