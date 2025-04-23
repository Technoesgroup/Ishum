import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./ContextApiCart/CartContextApi.jsx";
import './index.css'
import App from './App.jsx'

// ✅ Import FilterProvider
import { FilterProvider } from './Component/Context-API/Fillter-Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CartProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </CartProvider>
  </StrictMode>
)
