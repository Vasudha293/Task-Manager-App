import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppSimple from './AppSimple';

console.log('React index.js loaded');

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong.</h1>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
    return this.props.children;
  }
}

try {
  const rootElement = document.getElementById('root');
  console.log('Root element found:', rootElement);
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    console.log('ReactDOM root created');
    
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log('App rendered');
  } else {
    console.error('Root element not found!');
  }
} catch (error) {
  console.error('Error during React initialization:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h1>App Failed to Load</h1>
      <p>Error: ${error.message}</p>
      <button onclick="window.location.reload()">Reload</button>
    </div>
  `;
}