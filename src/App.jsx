import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import QRModal from './components/QRModal';
import ProductDetailModal from './components/ProductDetailModal';
import CartModal from './components/CartModal';

import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import RewardsScreen from './screens/RewardsScreen';
import HistoryScreen from './screens/HistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

import { initialUser, products, initialTransactions } from './data/mockData';

export default function App() {
  const [user, setUser] = useState(initialUser);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'menu' | 'rewards' | 'profile' | 'history'
  const [cartItems, setCartItems] = useState([]);
  const [transactions, setTransactions] = useState(initialTransactions);

  // Modals
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems(prev => [...prev, item]);
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutSuccess = ({ items, totalPrice, beansEarned, orderType }) => {
    // 1. Add beans to user
    setUser(prev => ({
      ...prev,
      beans: prev.beans + beansEarned
    }));

    // 2. Add transaction record
    const newTrx = {
      id: `TRX-BK-${Math.floor(10000 + Math.random() * 90000)}`,
      date: 'Baru Saja, Hari ini',
      outlet: 'Bagi Kopi — Tebet Timur',
      type: orderType === 'dine-in' ? 'Dine In' : 'Pick Up',
      status: 'Selesai',
      items: items.map(i => ({ name: `${i.name} (${i.customizations.temperature === 'ice' ? 'Iced' : 'Hot'})`, qty: i.quantity, price: i.totalPrice })),
      totalPrice,
      beansEarned,
      reviewed: false,
      rating: 0
    };

    setTransactions(prev => [newTrx, ...prev]);
    setCartItems([]);
    setActiveTab('history');
  };

  const handleDeductBeans = (amount) => {
    setUser(prev => ({
      ...prev,
      beans: Math.max(0, prev.beans - amount)
    }));
  };

  const handleAddReview = (trxId, rating, reviewNote) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === trxId) {
        return {
          ...t,
          reviewed: true,
          rating,
          reviewNote
        };
      }
      return t;
    }));
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Top Header */}
      <Header 
        user={user} 
        cartCount={totalCartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      {/* Main Screen Content */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomeScreen 
            user={user} 
            products={products}
            onSelectProduct={setSelectedProduct}
            onOpenQR={() => setIsQRModalOpen(true)}
            onNavigateToMenu={() => setActiveTab('menu')}
            onNavigateToRewards={() => setActiveTab('rewards')}
          />
        )}

        {activeTab === 'menu' && (
          <MenuScreen 
            products={products}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {activeTab === 'rewards' && (
          <RewardsScreen 
            user={user}
            onDeductBeans={handleDeductBeans}
          />
        )}

        {activeTab === 'history' && (
          <HistoryScreen 
            transactions={transactions}
            onAddReview={handleAddReview}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen 
            user={user}
            onNavigateToHistory={() => setActiveTab('history')}
            onNavigateToRewards={() => setActiveTab('rewards')}
            onOpenQR={() => setIsQRModalOpen(true)}
          />
        )}
      </main>

      {/* Floating Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQR={() => setIsQRModalOpen(true)} 
      />

      {/* Modals */}
      {isQRModalOpen && (
        <QRModal 
          user={user} 
          onClose={() => setIsQRModalOpen(false)} 
        />
      )}

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {isCartOpen && (
        <CartModal 
          cartItems={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={() => setCartItems([])}
          onCheckoutSuccess={handleCheckoutSuccess}
        />
      )}
    </div>
  );
}
