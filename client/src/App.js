import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAuth } from './hoc/RequireAuth';
import NewUser from './js/user/NewUser';
import Room from './js/room/Room';
import Rooms from './js/room/Rooms';
import NewRoom from './js/room/NewRoom';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // refetchInterval: 1000
      }
    }
  });

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;