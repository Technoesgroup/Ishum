import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ Import BrowserRouter
import { CartProvider } from "./ContextApiCart/CartContextApi.jsx";
import { AuthProvider } from './ContextApiCart/LoginContextApi.jsx';
import { ProductProvider } from "./ContextApiCart/ProductContextApi.jsx";
import './index.css';
import App from './App.jsx';
import { FilterProvider } from './Component/Context-API/Fillter-Context.jsx';
import { ModalProvider } from './Component/ModelContext/ModelContext.jsx';
import { WishlistProvider } from './Component/ContextHook/WishlistHook.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* ✅ Wrap your whole app in BrowserRouter */}
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <FilterProvider>
                <WishlistProvider>
                  <ModalProvider>
                    <App />
                  </ModalProvider>
                </WishlistProvider>
            </FilterProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
