import { createRoot } from 'react-dom/client'
import './index.css'

import { WorkspaceProvider } from "./context/WorkspaceContext";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <WorkspaceProvider>
      <App />
  </WorkspaceProvider>
)
