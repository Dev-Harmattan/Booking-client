import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirect_uri,
      }}
      audience={audience}
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
