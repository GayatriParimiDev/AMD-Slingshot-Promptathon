# 🚀 FIT FUEL: Next-Gen Nutrition

**FIT FUEL** is an aesthetic, dynamic, and fully responsive web application specifically designed for Gen Z fitness enthusiasts. Taking a modern approach to nutrition, it helps users optimize their health, muscle growth, fat loss, and even gut microbiome balance through education and intelligent tracking.

Built with bleeding-edge visual paradigms (Cyberpunk gradients and frosted glassmorphism UI) combined with ultra-fluid micro-interactions.

---

## ✨ Features

- **📊 Physique Engine (TDEE Calculator)**  
  A biological parameter tool that calculates your precise Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE). It outputs exact caloric recommendations for Maintenance, Cutting (Fat Loss), and Bulking (Muscle Gain).
  
- **🧠 Nutrition Matrix (Knowledge Base)**  
  An interactive, visually driven encyclopedia dividing foods into specific functional goals: *Muscle Building & Recovery*, *Digestive Health & Gut Flow*, *Weight Loss & Aesthetics*, and *Energy & Performance*.

- **🥩 Macro Command (Intake Tracker)**  
  A daily fuel logger where users can track exactly what they eat. It features dynamic progress bars to chart real-time calorie deficits/surpluses against protein synthesis goals. **Data persists in localStorage** so you never lose your day's log!

- **🛒 Supply Drop (Grocery Haul)**  
  An interactive check-off list to track what foods you're purchasing. Sorts by tags like *Protein*, *Gut Flow*, and *Health*. **Data magically persists in localStorage.**

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) - Lightning fast Hot Module Replacement (HMR)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Fluid layout transitions and pop animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS3 - Utilizing CSS Variables, `backdrop-filter` for glassmorphism, and responsive CSS grids. No heavy CSS libraries attached.

---

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/en/) installed (v16.14.0 or higher recommended).

### Installation

1. Clone or download the repository.
2. Open your terminal in the project's root folder.
3. Install the dependencies:

\`\`\`bash
npm install
\`\`\`

### Running the App Locally

Start up the Vite development server:

\`\`\`bash
npm run dev
\`\`\`

The console will output a local address (usually \`http://localhost:5173\`). Open this in your browser to experience FIT FUEL.

---

## 🧬 Project Structure
\`\`\`text
/src
  ├── /components
  │     ├── BodyCalculator.jsx   # TDEE & BMR Logic
  │     ├── GroceryTracker.jsx   # Persistent Shopping List
  │     ├── Hero.jsx             # Aesthetic Dashboard landing
  │     ├── IntakeTracker.jsx    # Persistent Macro Logger
  │     ├── KnowledgeBase.jsx    # Educational Nutrition grids
  │     └── Navbar.jsx           # Animated Top Navigation
  ├── /data
  │     └── foodInfo.js          # Raw JSON payload for the Nutrition Matrix
  ├── /hooks
  │     └── useLocalStorage.js   # Custom hook ensuring no data vanishes on reload
  ├── App.jsx                    # Routing & Core App Layout
  ├── index.css                  # Global variables, Glassmorphism classes
  └── main.jsx                   # React DOM Entry
\`\`\`

---

## 💡 Why it works for Gen Z?

Instead of boring, clinical tables, FIT FUEL uses gaming language (*"Macro Command"*, *"Physique Engine"*, *"Supply Drop"*) and striking aesthetics. By skipping dense paragraphs in favor of visually distinct stats and progress bars, it fits exactly how modern audiences want to consume health software: **Fast, Functional, and Beautiful.**

***Built by your AI Pair Programmer. Keep building the future.***
