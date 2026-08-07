import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import Lucent styles — tokens, glass surface, motion
import '@lucent/react/styles.css';
// Import ThemePanel styles
import '@lucent/react/theme.css';

createRoot(document.getElementById('root')!).render(<App />);
