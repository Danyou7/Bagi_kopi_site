import React from 'react';
import { Home, Coffee, Gift, User, QrCode } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onOpenQR }) {
  const tabs = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'menu', label: 'Menu', icon: Coffee },
    { id: 'qr', isCenter: true },
    { id: 'rewards', label: 'Reward', icon: Gift },
    { id: 'profile', label: 'Profil', icon: User }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 32px)',
      maxWidth: '408px',
      height: '66px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRadius: 'var(--radius-full)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      boxShadow: 'var(--shadow-nav)',
      border: '1px solid rgba(229, 216, 202, 0.8)',
      zIndex: 50,
      padding: '0 8px'
    }}>
      {tabs.map((tab, idx) => {
        if (tab.isCenter) {
          return (
            <div key="center-qr" style={{ position: 'relative', width: '56px' }}>
              <button
                onClick={onOpenQR}
                aria-label="Scan QR Member Kasir"
                style={{
                  position: 'absolute',
                  top: '-32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '58px',
                  height: '58px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary-electric)',
                  border: '4px solid var(--color-canvas)',
                  boxShadow: 'var(--shadow-fab)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <QrCode size={26} strokeWidth={2.4} />
              </button>
              <div style={{
                position: 'absolute',
                top: '28px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '10px',
                fontWeight: '700',
                color: 'var(--color-primary-electric)',
                whiteSpace: 'nowrap'
              }}>
                QR Member
              </div>
            </div>
          );
        }

        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              padding: '6px 0',
              color: isActive ? 'var(--color-primary-electric)' : 'var(--color-text-muted)',
              position: 'relative'
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span style={{
              fontSize: '11px',
              marginTop: '3px',
              fontWeight: isActive ? '700' : '500',
              letterSpacing: '-0.01em'
            }}>
              {tab.label}
            </span>
            {isActive && (
              <span style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-electric)',
                position: 'absolute',
                bottom: '2px'
              }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
