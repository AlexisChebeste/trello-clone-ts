import { createRoot } from 'react-dom/client'
import './index.css'

import { WorkspaceProvider } from "./context/WorkspaceContext";

import App from './App.tsx'
import ColorProvider  from './context/ColorContext.tsx';

createRoot(document.getElementById('root')!).render(
  <WorkspaceProvider>
    <ColorProvider>
      <App />
    </ColorProvider>
  </WorkspaceProvider>
)
