import React from 'react';
import ReactDOM from 'react-dom/client';
import BasicApp from './BasicApp';

console.log('✅ Starting React app with BasicApp');

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
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h1>❌ Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🔄 Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Initialize React with BasicApp
try {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <ErrorBoundary>
        <BasicApp />
      </ErrorBoundary>
    );
    console.log('✅ BasicApp rendered successfully');
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