import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './Layout';
import { RequireAuth } from '../hoc/RequireAuth';
import NewUser from './user/NewUser';
import Room from './room/Room';
import Rooms from './room/Rooms';
import NewRoom from './room/NewRoom';
import DataContext from '../contexts/DataContext';
import { useState } from 'react';
import { io } from 'socket.io-client';
import SocketContext from '../contexts/SocketContext';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });
  const [data, setData] = useState({});
  const [socket, setSocket] = useState(io.connect(process.env.REACT_APP_SERVER || "http://localhost:3001"));
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <DataContext.Provider value={{ data, setData }}>
          <SocketContext.Provider value={{ socket, setSocket }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="/" element={<Rooms />} />
                  <Route path=":id" element={<RequireAuth><Room /></RequireAuth>} />
                  <Route path="new" element={<NewRoom />} />
                  <Route path="login" element={<NewUser />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </SocketContext.Provider>
        </DataContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;