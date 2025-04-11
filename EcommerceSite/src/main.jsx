import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ✅ Import FilterProvider
import { FilterProvider } from './Component/Context-API/Fillter-Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ Wrap your App with FilterProvider */}
    <FilterProvider>
      <App />
    </FilterProvider>
  </StrictMode>
)
