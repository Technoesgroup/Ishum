import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from "./ContextApiCart/CartContextApi.jsx";
import { AuthProvider } from './ContextApiCart/LoginContextApi.jsx';
import { ProductProvider } from "./ContextApiCart/ProductContextApi.jsx";
import './index.css'
import App from './App.jsx'
import { TawkProvider } from './Component/TawkContextApi/TawkContextApi.jsx';
import { FilterProvider } from './Component/Context-API/Fillter-Context.jsx';
import { ModalProvider } from './Component/ModelContext/ModelContext.jsx';
import { PixelProvider } from './Component/FacebookPixel/FB-Pixel.jsx';
import { WishlistProvider } from './Component/ContextHook/WishlistHook.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider>
  <ProductProvider>
  <CartProvider>
    <FilterProvider>
    <TawkProvider>
      <WishlistProvider>
        <ModalProvider>
          <PixelProvider>
      <App />
      </PixelProvider >
    </ModalProvider>
    </WishlistProvider>
        </TawkProvider>
    </FilterProvider>
  </CartProvider>
  </ProductProvider> 
  </AuthProvider>
  </StrictMode>
 
)
