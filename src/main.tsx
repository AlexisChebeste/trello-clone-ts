import { createRoot } from 'react-dom/client'
import './index.css'

import { WorkspaceProvider } from "./context/WorkspaceContext";

import { BrowserRouter } from "react-router";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <WorkspaceProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WorkspaceProvider>
)
