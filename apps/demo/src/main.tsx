import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import Lucent styles — tokens, glass surface, motion
import 'glassui/styles.css';
// Import ThemePanel styles
import 'glassui/theme.css';

createRoot(document.getElementById('root')!).render(<App />);
