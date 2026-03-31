import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KnowledgeBase from './components/KnowledgeBase';
import IntakeTracker from './components/IntakeTracker';
import GroceryTracker from './components/GroceryTracker';
import BodyCalculator from './components/BodyCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Hero setActiveTab={setActiveTab} />;
      case 'calculator':
        return <BodyCalculator />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'intake':
        return <IntakeTracker />;
      case 'grocery':
        return <GroceryTracker />;
      default:
        return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="app-container">
        {renderContent()}
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto',
        color: 'var(--text-secondary)',
        fontSize: '0.9rem'
      }}>
        <p>© 2026 FIT FUEL. Architect your aesthetics. Fuel your health.</p>
      </footer>
    </>
  );
}

export default App;
