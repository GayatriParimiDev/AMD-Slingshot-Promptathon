import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Target, ActivitySquare } from 'lucide-react';

const BodyCalculator = () => {
  const [metric, setMetric] = useState({
    gender: 'male',
    age: '',
    weight: '', // in kg
    height: '', // in cm
    activity: 1.2
  });

  const [results, setResults] = useState(null);

  const calculateTDEE = (e) => {
    e.preventDefault();
    if (!metric.age || !metric.weight || !metric.height) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * Number(metric.weight)) + (6.25 * Number(metric.height)) - (5 * Number(metric.age));
    bmr = metric.gender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = Math.round(bmr * metric.activity);
    
    setResults({
      bmr: Math.round(bmr),
      maintenance: tdee,
      cutting: tdee - 500,
      bulking: tdee + 300
    });
  };

  return (
    <div style={{ padding: '2rem 0 6rem', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Physique <span style={{ color: '#ff003c' }}>Engine</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Calculate your baseline energy needs to craft your ideal physique.</p>
      </motion.div>

      <div style={styles.container}>
        <div className="glass-card" style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={20} color="var(--accent-primary)" /> Parameters
          </h3>
          
          <form onSubmit={calculateTDEE} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Biological Gender</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" 
                  onClick={() => setMetric({...metric, gender: 'male'})}
                  style={{ ...styles.genderBtn, 
                    border: metric.gender === 'male' ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                    background: metric.gender === 'male' ? 'rgba(0,240,255,0.1)' : 'transparent',
                    color: metric.gender === 'male' ? 'var(--accent-primary)' : 'var(--text-primary)'
                  }}>Male</button>
                <button type="button" 
                  onClick={() => setMetric({...metric, gender: 'female'})}
                  style={{ ...styles.genderBtn, 
                    border: metric.gender === 'female' ? '1px solid #ff003c' : '1px solid var(--glass-border)',
                    background: metric.gender === 'female' ? 'rgba(255,0,60,0.1)' : 'transparent',
                    color: metric.gender === 'female' ? '#ff003c' : 'var(--text-primary)'
                  }}>Female</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Age (yrs)</label>
                <input type="number" value={metric.age} onChange={e => setMetric({...metric, age: e.target.value})} required max="100"/>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Weight (kg)</label>
                <input type="number" value={metric.weight} onChange={e => setMetric({...metric, weight: e.target.value})} required/>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Height (cm)</label>
                <input type="number" value={metric.height} onChange={e => setMetric({...metric, height: e.target.value})} required/>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Activity Level</label>
              <select value={metric.activity} onChange={e => setMetric({...metric, activity: parseFloat(e.target.value)})}>
                <option value={1.2}>Sedentary (Little/no exercise)</option>
                <option value={1.375}>Light Active (1-3 days/week)</option>
                <option value={1.55}>Moderate Active (3-5 days/week)</option>
                <option value={1.725}>Very Active (6-7 days/week)</option>
                <option value={1.9}>Extra Active (Physical job/2x day training)</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Calculate Macros</button>
          </form>
        </div>

        {results && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Basal Metabolic Rate</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{results.bmr} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>kcal/day</span></div>
            </div>
            
            <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0,240,255,0.2)' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-primary)' }}>
                <ActivitySquare size={20} /> Maintenance (TDEE)
              </h3>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{results.maintenance} <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>kcal</span></div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Calories needed to maintain current weight.</p>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(255, 138, 0, 0.05)', border: '1px solid rgba(255, 138, 0, 0.2)' }}>
                <h4 style={{ color: '#ff8a00', marginBottom: '4px' }}>Cutting</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{results.cutting}</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fat loss phase</p>
              </div>
              <div style={{ flex: 1, padding: '1rem', borderRadius: '12px', background: 'rgba(112, 0, 255, 0.05)', border: '1px solid rgba(112, 0, 255, 0.2)' }}>
                <h4 style={{ color: '#7000ff', marginBottom: '4px' }}>Bulking</h4>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{results.bulking}</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Muscle gain phase</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    gap: '2rem',
    flexDirection: 'column',
    '@media (minWidth: 768px)': {
      flexDirection: 'row'
    }
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1
  },
  label: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)'
  },
  genderBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    transition: 'all 0.2s'
  }
};

export default BodyCalculator;
