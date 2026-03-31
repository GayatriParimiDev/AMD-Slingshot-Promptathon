import React from 'react';
import { motion } from 'framer-motion';
import { foodData } from '../data/foodInfo';
import { Dumbbell, Activity, Flame, Zap } from 'lucide-react';

const icons = {
  Dumbbell: <Dumbbell size={24} />,
  Activity: <Activity size={24} />,
  Flame: <Flame size={24} />,
  Zap: <Zap size={24} />
};

const KnowledgeBase = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div style={{ padding: '2rem 0 6rem' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Nutrition <span className="gradient-text">Matrix</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Understand how different macros and micronutrients dictate your physique, energy, and overall health.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        style={styles.grid}
      >
        {foodData.map((category, idx) => (
          <motion.div key={idx} variants={item} className="glass-card" style={styles.categoryCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
              <div style={{ ...styles.iconContainer, background: `rgba(${hexToRgb(category.color)}, 0.2)`, color: category.color }}>
                {icons[category.icon]}
              </div>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{category.title}</h3>
                <span style={{ color: category.color, fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>{category.category}</span>
              </div>
            </div>
            
            <div style={styles.itemList}>
              {category.items.map((food, foodIdx) => (
                <div key={foodIdx} style={styles.foodItem}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{food.name}</h4>
                    <span style={{ fontSize: '0.8rem', background: 'var(--glass-border)', padding: '2px 8px', borderRadius: '12px' }}>
                      {food.calories} cal | {food.protein}g P
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{food.benefit}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Helper to convert hex to rgb for alpha transparency
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 240, 255';
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
  },
  categoryCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  foodItem: {
    borderLeft: '2px solid var(--glass-border)',
    paddingLeft: '1rem',
    transition: 'border-color 0.3s ease',
  }
};

export default KnowledgeBase;
