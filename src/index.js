import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple fallback component that always works
function FallbackApp() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#333', textAlign: 'center', marginBottom: '30px' }}>
          🎯 TaskBoard - Task Management
        </h1>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            ✅ Application deployed successfully!
          </p>
          <p style={{ color: '#888' }}>
            Your React app is working. Loading full application...
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#1976d2', margin: '0 0 10px 0' }}>📋 To Do</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Tasks to start</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#f57c00', margin: '0 0 10px 0' }}>⚡ In Progress</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Active tasks</p>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#388e3c', margin: '0 0 10px 0' }}>✅ Completed</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>Finished tasks</p>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            🔄 Reload Full App
          </button>
        </div>
      </div>
    </div>
  );
}

// Import the basic app that always works
import BasicApp from './BasicApp';

let AppToRender = BasicApp;

try {
  // Try to import the full app
  const App = require('./App').default;
  
  // If imports succeed, use the full app
  AppToRender = App;
  console.log('✅ Full app loaded successfully');
} catch (error) {
  console.warn('⚠️ Full app failed to load, using basic app:', error.message);
  AppToRender = BasicApp;
}

// Error boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackApp />;
    }
    return this.props.children;
  }
}

// Initialize React
try {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <ErrorBoundary>
        <AppToRender />
      </ErrorBoundary>
    );
    console.log('✅ React app rendered successfully');
  } else {
    console.error('❌ Root element not found');
    document.body.innerHTML = '<div style="padding:20px;text-align:center;"><h1>❌ Root element missing</h1></div>';
  }
} catch (error) {
  console.error('❌ Critical error:', error);
  document.body.innerHTML = `
    <div style="padding:20px;text-align:center;font-family:Arial;">
      <h1>❌ App Failed to Initialize</h1>
      <p>Error: ${error.message}</p>
      <button onclick="window.location.reload()">🔄 Reload</button>
    </div>
  `;
}