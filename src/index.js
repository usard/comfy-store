import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ProductsContextProvider } from './context/products_context';
import { FilterContextProvider } from './context/filter_context';
import { CartContextProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-0rmldgdbn6l13z2x.us.auth0.com"
    clientId="k0KN6HSasRBQGJQDcFC9gXJxmjnBC0B5"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > 
    <ProductsContextProvider>
      <FilterContextProvider>
        <CartContextProvider>
        <App/>
        </CartContextProvider>
      </FilterContextProvider>
    </ProductsContextProvider>
  </Auth0Provider>
 );
