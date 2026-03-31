import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Activity, Flame, Zap, Salad, ShoppingCart, ActivitySquare, Calculator } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: ActivitySquare },
    { id: 'calculator', label: 'Physique Engine', icon: Calculator },
    { id: 'knowledge', label: 'Knowledge Base', icon: Salad },
    { id: 'intake', label: 'Intake Tracker', icon: Dumbbell },
    { id: 'grocery', label: 'Grocery Haul', icon: ShoppingCart },
  ];

  return (
    <nav style={styles.navContainer}>
      <div className="app-container" style={styles.navInner}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={styles.logo}
        >
          <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '2px' }}>FIT</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '2px' }}>FUEL</span>
        </motion.div>
        
        <div style={styles.navLinks}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.navItem,
                  background: isActive ? 'var(--glass-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--accent-primary)' : '1px solid transparent',
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'
                }}
              >
                <Icon size={18} style={{ marginRight: '8px', opacity: isActive ? 1 : 0.7 }} />
                <span className="nav-label">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
        
        <div style={styles.mobileNav}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  ...styles.mobileNavItem,
                  color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'
                }}
              >
                <Icon size={24} />
              </button>
            );
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .nav-label { display: none; }
        }
      `}} />
    </nav>
  );
};

const styles = {
  navContainer: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(10, 10, 10, 0.8)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid var(--glass-border)',
  },
  navInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer'
  },
  navLinks: {
    display: 'flex',
    gap: '12px',
    '@media (maxWidth: 768px)': {
      display: 'none'
    }
  },
  mobileNav: {
    display: 'none',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.95rem',
  },
  mobileNavItem: {
    background: 'transparent',
    padding: '8px',
  }
};

export default Navbar;
