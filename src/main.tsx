import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const globalRootKey = '__reactRoot__';

if (!(window as any)[globalRootKey]) {
  (window as any)[globalRootKey] = createRoot(container);
}

(window as any)[globalRootKey].render(
  <StrictMode>
    <App />
  </StrictMode>,
);
