import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Import Lucent styles — tokens, glass surface, motion
import 'vitreui/styles.css';
// Import ThemePanel styles
import 'vitreui/theme.css';

createRoot(document.getElementById('root')!).render(<App />);
