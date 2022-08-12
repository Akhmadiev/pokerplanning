import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
import Rooms from './Rooms';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import NewRoom from './NewRoom';
import Room from './Room';

class Game extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      userName: null
    };
  }

  handleOnClick = (userName) => {
    this.setState({ visible: true });
  };

  render() {
    const queryClient = new QueryClient();

    return (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Rooms />} />
              <Route path="/:id" element={<Room />} />
              <Route path="/new" element={<NewRoom />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
