import React, { useState } from 'react';
import { Search, Plus, Sparkles, Star } from 'lucide-react';
import { categories } from '../data/mockData';

export default function MenuScreen({ products, onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fade-in" style={{ padding: '16px 20px 95px 20px' }}>
      {/* Title */}
      <div style={{ marginBottom: '14px' }}>
        <h1 style={{ fontSize: '22px', color: 'var(--color-espresso-dark)' }}>
          Katalog Menu
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
          Artisanal coffee & fresh pastries dibuat segar setiap hari
        </p>
      </div>

      {/* Search Input */}
      <div style={{
        position: 'relative',
        marginBottom: '16px'
      }}>
        <Search 
          size={18} 
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-light)'
          }} 
        />
        <input 
          type="text"
          placeholder="Cari kopi, matcha, atau pastry..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            height: '46px',
            paddingLeft: '42px',
            paddingRight: '14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            fontSize: '13px',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
      </div>

      {/* Category Pills */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '8px',
        marginBottom: '16px'
      }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: activeCategory === cat.id ? 'var(--color-primary-electric)' : 'var(--color-surface)',
              color: activeCategory === cat.id ? '#ffffff' : 'var(--color-espresso)',
              border: activeCategory === cat.id ? 'none' : '1px solid var(--color-border)',
              fontSize: '12px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              boxShadow: activeCategory === cat.id ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '14px' }}>Tidak ada menu yang sesuai dengan "{searchQuery}"</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px'
        }}>
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border-light)',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              {/* Image */}
              <div style={{ width: '100%', height: '130px', position: 'relative' }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(34, 28, 24, 0.75)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: '700',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  {product.tag}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--color-caramel-gold)', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>
                    <Star size={11} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                  <h3 style={{ fontSize: '14px', color: 'var(--color-espresso-dark)', lineHeight: 1.3 }}>
                    {product.name}
                  </h3>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--color-primary-electric)', fontFamily: 'var(--font-heading)' }}>
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--color-caramel)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <Sparkles size={10} />
                      <span>+{product.beansReward} Beans</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    aria-label={`Tambah ${product.name}`}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-primary-electric)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
