import { Suspense, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Websites } from './pages/Websites';
import { Layout } from './components/Layout/Layout';
import { Properties } from './pages/Properties/Properties';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Property } from './pages/Property/Property';
import UserDetailsContext from '../context/UserDetailsContext';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userDetails, setUserDetails] = useState({
    favorites: [],
    bookings: [],
    token: '',
  });
  const queryClient = new QueryClient();
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Websites />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserDetailsContext.Provider>
  );
}

export default App;
