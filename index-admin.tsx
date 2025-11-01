// no início do arquivo principal (index-admin.tsx)
window.addEventListener('error', (ev) => {
  console.error('Window error event:', ev.error || ev.message, ev);
});
window.addEventListener('unhandledrejection', (ev) => {
  console.error('Unhandled promise rejection:', ev.reason);
});

// index-admin.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import AdminApp from './AppAdmin';

const rootElement = document.getElementById('root');

if (!rootElement) {
  // evita throw; mostra mensagem para debug no DOM
  console.error("Could not find root element to mount to");
  document.body.innerHTML = "<pre style='color:red'>ERROR: root element not found</pre>";
} else {
  const root = ReactDOM.createRoot(rootElement);
  try {
    root.render(
      <React.StrictMode>
        <AdminApp />
      </React.StrictMode>
    );
  } catch (err) {
    // mostra stack no console e também na tela para o estúdio capturar
    console.error("App render error:", err);
    // tenta renderizar mensagem de erro simples
    root.render(
      <div style={{padding:20, color:'red', fontFamily:'monospace', whiteSpace:'pre-wrap'}}>
        <strong>Erro ao iniciar o app:</strong>
        <div>{String(err && (err as any).message)}</div>
        <pre>{String(err && (err as any).stack)}</pre>
      </div>
    );
  }
}