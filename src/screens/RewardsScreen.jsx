import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle, Clock, Tag } from 'lucide-react';
import { rewardsData } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function RewardsScreen({ user, onDeductBeans }) {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'my-vouchers'
  const [claimedVouchers, setClaimedVouchers] = useState([
    {
      id: 'my-1',
      title: 'Diskon Member Baru Rp 10.000',
      minPurchase: 'Min. belanja Rp 30.000',
      validUntil: '30 Okt 2026',
      code: 'BKNEW10K'
    },
    {
      id: 'my-2',
      title: 'Free Upsize Semua Varian',
      minPurchase: 'Berlaku jam 08:00 - 11:00 WIB',
      validUntil: '20 Okt 2026',
      code: 'UPSIZEBK'
    }
  ]);

  const handleClaimReward = (reward) => {
    if (user.beans < reward.beansRequired) {
      alert(`Saldo Bagi Beans Anda belum mencukupi. Butuh ${reward.beansRequired} Beans.`);
      return;
    }

    const confirmClaim = window.confirm(`Tukarkan ${reward.beansRequired} Bagi Beans untuk "${reward.title}"?`);
    if (confirmClaim) {
      onDeductBeans(reward.beansRequired);
      setClaimedVouchers(prev => [
        {
          id: `claimed-${Date.now()}`,
          title: reward.title,
          minPurchase: reward.minPurchase,
          validUntil: '14 Hari dari sekarang',
          code: `BK${Math.floor(100000 + Math.random() * 900000)}`
        },
        ...prev
      ]);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
      alert(`Selamat! "${reward.title}" berhasil ditukarkan dan tersimpan di Voucher Saya.`);
    }
  };

  return (
    <div className="fade-in" style={{ padding: '16px 20px 95px 20px' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e60ff 0%, #0048d4 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: 'var(--shadow-fab)',
        marginBottom: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '11px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          <Sparkles size={12} />
          <span>Bagi Beans Reward Hub</span>
        </div>

        <div style={{ fontSize: '12px', color: '#e0ebff' }}>
          Saldo Beans Anda
        </div>
        <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#ffffff', marginTop: '2px' }}>
          {user.beans.toLocaleString('id-ID')} <span style={{ fontSize: '14px', fontWeight: '600' }}>Beans</span>
        </div>
        <div style={{ fontSize: '11px', color: '#c3d8ff', marginTop: '4px' }}>
          Kumpulkan beans di setiap transaksi & tukarkan dengan voucher eksklusif.
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: 'var(--color-surface-container)',
        padding: '4px',
        borderRadius: 'var(--radius-full)',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setActiveTab('catalog')}
          style={{
            padding: '10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: activeTab === 'catalog' ? '#ffffff' : 'transparent',
            color: activeTab === 'catalog' ? 'var(--color-espresso)' : 'var(--color-text-muted)',
            fontWeight: '700',
            fontSize: '12px',
            boxShadow: activeTab === 'catalog' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          🎁 Katalog Penukaran
        </button>
        <button
          onClick={() => setActiveTab('my-vouchers')}
          style={{
            padding: '10px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: activeTab === 'my-vouchers' ? '#ffffff' : 'transparent',
            color: activeTab === 'my-vouchers' ? 'var(--color-espresso)' : 'var(--color-text-muted)',
            fontWeight: '700',
            fontSize: '12px',
            boxShadow: activeTab === 'my-vouchers' ? 'var(--shadow-sm)' : 'none'
          }}
        >
          🎟️ Voucher Saya ({claimedVouchers.length})
        </button>
      </div>

      {/* Tab: Catalog */}
      {activeTab === 'catalog' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {rewardsData.map(reward => {
            const canClaim = user.beans >= reward.beansRequired;
            return (
              <div
                key={reward.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{
                      backgroundColor: 'var(--color-surface-container)',
                      color: reward.color,
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-block',
                      marginBottom: '4px'
                    }}>
                      {reward.badge}
                    </span>
                    <h3 style={{ fontSize: '15px', color: 'var(--color-espresso-dark)' }}>
                      {reward.title}
                    </h3>
                    <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      {reward.minPurchase} • Berlaku {reward.validDays} hari
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    backgroundColor: 'var(--color-caramel-light)',
                    color: 'var(--color-caramel)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: '800',
                    fontSize: '12px'
                  }}>
                    <Sparkles size={12} />
                    <span>{reward.beansRequired} Beans</span>
                  </div>
                </div>

                <button
                  onClick={() => handleClaimReward(reward)}
                  disabled={!canClaim}
                  style={{
                    width: '100%',
                    height: '40px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: canClaim ? 'var(--color-primary-electric)' : 'var(--color-surface-dim)',
                    color: canClaim ? '#ffffff' : 'var(--color-text-light)',
                    fontWeight: '700',
                    fontSize: '13px',
                    boxShadow: canClaim ? 'var(--shadow-sm)' : 'none',
                    cursor: canClaim ? 'pointer' : 'not-allowed'
                  }}
                >
                  {canClaim ? 'Tukarkan Reward' : `Kurang ${reward.beansRequired - user.beans} Beans`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab: My Vouchers */}
      {activeTab === 'my-vouchers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {claimedVouchers.map(v => (
            <div
              key={v.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                border: '1px dashed var(--color-primary-electric)',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-success)', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>
                    <CheckCircle size={12} />
                    <span>Aktif & Siap Digunakan</span>
                  </div>
                  <h3 style={{ fontSize: '15px', color: 'var(--color-espresso-dark)' }}>
                    {v.title}
                  </h3>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                    {v.minPurchase}
                  </div>
                </div>
              </div>

              <div style={{
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px solid var(--color-border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                  <Clock size={12} />
                  <span>s/d {v.validUntil}</span>
                </div>
                <span style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: '800',
                  color: 'var(--color-primary-electric)',
                  backgroundColor: 'var(--color-primary-light)',
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  {v.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
