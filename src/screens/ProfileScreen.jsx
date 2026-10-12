import React from 'react';
import { User, Shield, CreditCard, HelpCircle, Settings, LogOut, ChevronRight, Sparkles, Coffee } from 'lucide-react';

export default function ProfileScreen({ user, onNavigateToHistory, onNavigateToRewards, onOpenQR }) {
  return (
    <div className="fade-in" style={{ padding: '16px 20px 95px 20px' }}>
      {/* Profile Header Card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        border: '1px solid var(--color-border-light)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '18px'
      }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            objectFit: 'cover',
            border: '3px solid var(--color-primary-electric)',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: 'var(--color-caramel-light)',
            color: 'var(--color-caramel)',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            marginBottom: '4px'
          }}>
            <Sparkles size={11} />
            <span>{user.tier}</span>
          </div>
          <h2 style={{ fontSize: '18px', color: 'var(--color-espresso-dark)' }}>
            {user.name}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {user.phone}
          </p>
        </div>
      </div>

      {/* Membership Perks Overview */}
      <div style={{
        backgroundColor: 'var(--color-surface-container)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
        marginBottom: '20px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--color-espresso)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Coffee size={14} color="var(--color-caramel)" />
          <span>Keuntungan Membership Anda:</span>
        </div>
        <ul style={{ fontSize: '11px', color: 'var(--color-text-muted)', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li>Kumpulkan 1 Bagi Bean setiap pembelanjaan Rp 1.000</li>
          <li>Gratis 1 Signature Coffee di hari ulang tahun Anda</li>
          <li>Prioritas antrean pesanan via aplikasi</li>
        </ul>
      </div>

      {/* Menu Links */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-light)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {[
          { label: 'Riwayat Transaksi & Ulasan', icon: Shield, action: onNavigateToHistory },
          { label: 'Voucher & Kupon Saya', icon: Sparkles, action: onNavigateToRewards },
          { label: 'Metode Pembayaran Digital', icon: CreditCard, action: () => alert('Mendukung QRIS, GoPay, OVO, ShopeePay & Kartu Kredit') },
          { label: 'Pusat Bantuan & Layanan Konsumen', icon: HelpCircle, action: () => alert('Hubungi WhatsApp resmi Bagi Kopi Care di 0812-XXXX-XXXX') },
          { label: 'Pengaturan Akun & Privasi', icon: Settings, action: () => alert('Pengaturan notifikasi dan data pribadi') }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={item.action}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 18px',
                borderBottom: idx < 4 ? '1px solid var(--color-border-light)' : 'none',
                color: 'var(--color-espresso)',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-surface-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-electric)'
                }}>
                  <Icon size={16} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: '600' }}>{item.label}</span>
              </div>
              <ChevronRight size={16} color="var(--color-text-light)" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          if (window.confirm('Apakah Anda ingin keluar dari aplikasi?')) {
            alert('Berhasil logout. Terima kasih telah mengunjungi Bagi Kopi!');
          }
        }}
        style={{
          width: '100%',
          marginTop: '20px',
          padding: '14px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'transparent',
          border: '1.5px solid var(--color-danger)',
          color: 'var(--color-danger)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontWeight: '700',
          fontSize: '13px'
        }}
      >
        <LogOut size={16} />
        <span>Keluar dari Akun</span>
      </button>

      {/* App Version Info */}
      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: 'var(--color-text-light)' }}>
        Bagi Kopi Mobile v2.4.0 (PWA Edition) • © 2026 PT Bagi Kopi Indonesia
      </div>
    </div>
  );
}
