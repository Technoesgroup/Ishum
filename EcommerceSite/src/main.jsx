import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./ContextApiCart/CartContextApi.jsx";
import { AuthProvider } from './ContextApiCart/LoginContextApi.jsx';
import './index.css'
import App from './App.jsx'

import { FilterProvider } from './Component/Context-API/Fillter-Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <CartProvider>
    <FilterProvider>
      <App />
    </FilterProvider>
  </CartProvider>
  </AuthProvider>
  </StrictMode>
 
)
