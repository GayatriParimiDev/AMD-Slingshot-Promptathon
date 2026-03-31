import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ setActiveTab }) => {
  return (
    <div style={styles.heroContainer}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={styles.heroContent}
      >
        <h1 style={styles.heading}>
          <span style={{ display: 'block', fontSize: '1.2rem', color: 'var(--accent-primary)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 500 }}>NEXT-GEN NUTRITION</span>
          Fuel Your <span className="gradient-text">Aesthetics.</span><br/>
          Optimize Your <span className="gradient-text-alt">Health.</span>
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Whether you're hitting the gym, aiming for fat loss, or healing your gut—discover the foods that architect your ultimate physique and track your daily fuel.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => setActiveTab('intake')}>
            Track Intake
          </button>
          <button className="btn-secondary" onClick={() => setActiveTab('knowledge')}>
            Learn Nutrition
          </button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={styles.statsContainer}
      >
        <div className="glass-card" style={styles.statCard}>
          <h3 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>85%</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Of aesthetics is nutrition.</p>
        </div>
        <div className="glass-card" style={styles.statCard}>
          <h3 className="gradient-text-alt" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>100%</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Gut health matters.</p>
        </div>
        <div className="glass-card" style={styles.statCard}>
          <h3 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--accent-tertiary)' }}>∞</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Gains incoming.</p>
        </div>
      </motion.div>
    </div>
  );
};

const styles = {
  heroContainer: {
    padding: '6rem 0',
    textAlign: 'center',
    position: 'relative',
  },
  heroContent: {
    marginBottom: '4rem',
  },
  heading: {
    fontSize: '4.5rem',
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    fontWeight: 800,
    letterSpacing: '-1px',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
  },
  statCard: {
    padding: '2.5rem 1.5rem',
  }
};

export default Hero;
