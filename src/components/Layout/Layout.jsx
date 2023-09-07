import React, { useContext, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailsContext from '../../../context/UserDetailsContext';
import { useMutation } from 'react-query';
import { createUser } from '../../utils/api';

const audience = import.meta.env.VITE_REACT_APP_AUTH0_AUDIENCE;

export const Layout = () => {
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails, userDetails } = useContext(UserDetailsContext);

  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: 'http://localhost:3000',
          scope: 'openid profile email',
        },
      });
      localStorage.setItem('access_token', res);
      setUserDetails((prev) => ({ ...prev, token: res }));

      mutate(res);
    };

    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  return (
    <>
      <div style={{ background: 'var(--black)', overflow: 'hidden' }}>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};