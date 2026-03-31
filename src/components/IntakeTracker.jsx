import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const IntakeTracker = () => {
  const [meals, setMeals] = useLocalStorage('fitfuel-meals', [
    { id: 1, name: 'Oatmeal & Protein Whey', calories: 450, protein: 45 },
    { id: 2, name: 'Chicken Breast & Broccoli', calories: 350, protein: 40 }
  ]);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', protein: '' });

  const totalCalories = meals.reduce((sum, meal) => sum + Number(meal.calories), 0);
  const totalProtein = meals.reduce((sum, meal) => sum + Number(meal.protein), 0);
  const goalCalories = 2500;
  const goalProtein = 180;

  const addMeal = (e) => {
    e.preventDefault();
    if (!newMeal.name || !newMeal.calories || !newMeal.protein) return;
    
    setMeals([
      ...meals,
      {
        id: Date.now(),
        name: newMeal.name,
        calories: Number(newMeal.calories),
        protein: Number(newMeal.protein)
      }
    ]);
    setNewMeal({ name: '', calories: '', protein: '' });
  };

  const removeMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  const percentageCal = Math.min((totalCalories / goalCalories) * 100, 100);
  const percentagePro = Math.min((totalProtein / goalProtein) * 100, 100);

  return (
    <div style={{ padding: '2rem 0 6rem', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Macro <span className="gradient-text-alt">Command</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Track your daily fuel. Hit your protein. Control the surplus or deficit.</p>
      </motion.div>

      <div style={styles.dashboard}>
        <div className="glass-card" style={styles.progressCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Energy Balance</h3>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{totalCalories} / {goalCalories} kcal</span>
          </div>
          <div style={styles.progressBarBg}>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${percentageCal}%` }} 
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ ...styles.progressBarFill, background: 'var(--accent-primary)' }} 
            />
          </div>
          <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {totalCalories > goalCalories ? <TrendingUp size={16} color="var(--accent-secondary)" /> : <TrendingDown size={16} color="var(--accent-primary)" />}
            {Math.abs(goalCalories - totalCalories)} kcal {totalCalories > goalCalories ? 'over' : 'remaining'}
          </p>
        </div>

        <div className="glass-card" style={styles.progressCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Muscle Synthesis (Protein)</h3>
            <span style={{ color: 'var(--accent-tertiary)', fontWeight: 700 }}>{totalProtein} / {goalProtein} g</span>
          </div>
          <div style={styles.progressBarBg}>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${percentagePro}%` }} 
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              style={{ ...styles.progressBarFill, background: 'var(--accent-tertiary)' }} 
            />
          </div>
          <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {totalProtein >= goalProtein ? <Plus size={16} color="var(--accent-tertiary)" /> : <Minus size={16} color="var(--text-secondary)" />}
            {Math.max(0, goalProtein - totalProtein)}g remaining
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 700 }}>Log Fuel</h3>
        
        <form onSubmit={addMeal} style={styles.formGrid}>
          <input 
            type="text" 
            placeholder="Food / Meal Name" 
            value={newMeal.name}
            onChange={e => setNewMeal({...newMeal, name: e.target.value})}
            style={{ flex: 2, minWidth: '200px' }}
            required
          />
          <input 
            type="number" 
            placeholder="Calories" 
            value={newMeal.calories}
            onChange={e => setNewMeal({...newMeal, calories: e.target.value})}
            style={{ flex: 1, minWidth: '100px' }}
            required
          />
          <input 
            type="number" 
            placeholder="Protein (g)" 
            value={newMeal.protein}
            onChange={e => setNewMeal({...newMeal, protein: e.target.value})}
            style={{ flex: 1, minWidth: '100px' }}
            required
          />
          <button type="submit" className="btn-primary" style={{ padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={20} />
          </button>
        </form>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {meals.map((meal) => (
            <motion.div 
              key={meal.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={styles.mealItem}
            >
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{meal.name}</h4>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span><Flame size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }}/>{meal.calories} kcal</span>
                  <span><Dumbbell size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }}/>{meal.protein}g Protein</span>
                </div>
              </div>
              <button 
                onClick={() => removeMeal(meal.id)}
                style={{ background: 'transparent', color: 'var(--text-secondary)', padding: '8px' }}
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
          
          {meals.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic', padding: '2rem 0' }}>
              No fuel logged yet today. Time to eat!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    gap: '1.5rem',
    flexDirection: 'column',
    '@media (minWidth: 768px)': {
      flexDirection: 'row'
    }
  },
  progressCard: {
    flex: 1,
    padding: '1.5rem',
  },
  progressBarBg: {
    height: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: '6px',
  },
  formGrid: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  mealItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    border: '1px solid var(--glass-border)'
  }
};

export default IntakeTracker;
