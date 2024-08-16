import React from 'react';

import { createRoot } from 'react-dom/client';

import App from './App';
import { UIProvider } from './shared/context/tab-context';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <UIProvider>
      <App />
    </UIProvider>
  </React.StrictMode>
);
