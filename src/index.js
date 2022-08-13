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
import { RequireAuth } from './hoc/RequireAuth';
import Login from './Login';

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
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchInterval: 2000
        }
      },
    });

    return (
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Rooms />} />
              <Route path=":id" element={<RequireAuth><Room /></RequireAuth>} />
              <Route path="new" element={<NewRoom />} />
              <Route path="login" element={<Login />} />
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
