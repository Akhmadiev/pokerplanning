import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class Game extends React.Component {
  render() {
    return (
      <App/>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
