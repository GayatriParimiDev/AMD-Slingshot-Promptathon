import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, ShoppingCart, Plus, Leaf, Flame, Activity } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GroceryTracker = () => {
  const [items, setItems] = useLocalStorage('fitfuel-groceries', [
    { id: 1, name: 'Grass-fed Beef (1kg)', category: 'protein', purchased: true },
    { id: 2, name: 'Greek Yogurt (Plain)', category: 'gut', purchased: false },
    { id: 3, name: 'Spinach & Kale', category: 'health', purchased: false },
    { id: 4, name: 'Whey Isolate', category: 'protein', purchased: false },
  ]);
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('protein');

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([{ id: Date.now(), name: newItem, category, purchased: false }, ...items]);
    setNewItem('');
  };

  const togglePurchased = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'protein': return <Flame size={16} color="#ff003c" />;
      case 'gut': return <Activity size={16} color="#00f0ff" />;
      case 'health': return <Leaf size={16} color="#00ff66" />;
      default: return <ShoppingCart size={16} />;
    }
  };

  const unpurchased = items.filter(i => !i.purchased);
  const purchased = items.filter(i => i.purchased);

  return (
    <div style={{ padding: '2rem 0 6rem', maxWidth: '600px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Supply <span style={{ color: '#00f0ff' }}>Drop</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Track your arsenal. Keep your fridge stocked with growth material.</p>
      </motion.div>

      <form onSubmit={addItem} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Add an item to your list..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '120px' }}>
          <option value="protein">Protein</option>
          <option value="gut">Gut Flow</option>
          <option value="health">Health</option>
        </select>
        <button type="submit" className="btn-primary" style={{ padding: '0 20px' }}><Plus size={20} /></button>
      </form>

      <div className="glass-card">
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>Active List ({unpurchased.length})</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
          <AnimatePresence>
            {unpurchased.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => togglePurchased(item.id)}
                style={styles.listItem}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Circle size={20} color="var(--text-secondary)" />
                  <span style={{ fontSize: '1.1rem' }}>{item.name}</span>
                </div>
                <div style={styles.catBadge}>
                  {getCategoryIcon(item.category)}
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {unpurchased.length === 0 && <p style={{ color: 'var(--text-secondary)', textAlign: 'center', margin: '1rem 0' }}>All items secured.</p>}
        </div>

        {purchased.length > 0 && (
          <>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem', color: 'var(--text-secondary)' }}>Secured Items</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <AnimatePresence>
                {purchased.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    onClick={() => togglePurchased(item.id)}
                    style={{ ...styles.listItem, opacity: 0.5 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'line-through' }}>
                      <CheckCircle2 size={20} color="var(--accent-primary)" />
                      <span style={{ fontSize: '1.1rem' }}>{item.name}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '12px',
    cursor: 'pointer',
    border: '1px solid transparent',
    transition: 'all 0.2s',
  },
  catBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'var(--glass-bg)',
    padding: '4px 10px',
    borderRadius: '20px',
  }
};

export default GroceryTracker;
