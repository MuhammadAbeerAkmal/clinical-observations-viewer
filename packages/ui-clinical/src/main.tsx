import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { setAuthTokenProvider } from './app/api/client';
import App from './app/app';

function mountApp(): void {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

if (process.env.NX_AUTH_ENABLED === 'true') {
  import('keycloak-js').then(({ default: Keycloak }) => {
    const keycloak = new Keycloak({
      url: process.env.NX_KEYCLOAK_URL ?? 'http://localhost:8080',
      realm: process.env.NX_KEYCLOAK_REALM ?? 'clinical-demo',
      clientId: process.env.NX_KEYCLOAK_CLIENT_ID ?? 'clinical-ui',
    });

    keycloak
      .init({ onLoad: 'login-required', pkceMethod: 'S256' })
      .then((authenticated: boolean) => {
        if (authenticated) {
          setAuthTokenProvider(() => keycloak.token);
          setInterval(() => {
            keycloak.updateToken(60).catch(() => keycloak.logout());
          }, 30_000);
        }
        mountApp();
      })
      .catch(() => {
        console.error('Keycloak initialisation failed - starting unauthenticated');
        mountApp();
      });
  });
} else {
  mountApp();
}
