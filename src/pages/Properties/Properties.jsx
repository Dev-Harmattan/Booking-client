import React, { useContext, useEffect } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './Properties.css';
import { useProperties } from '../../hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import UserDetailsContext from '../../../context/UserDetailsContext';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserBookings } from '../../utils/api';
import { useMutation } from 'react-query';

export const Properties = () => {
  const { isAuthenticated, user } = useAuth0();
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext);
  const { data, isError, isLoading } = useProperties();

  const {
    mutate,
    data: userBookings,
    isLoading: bookingLoading,
  } = useMutation({
    mutationKey: ['userBookings', user?.email],
    mutationFn: (email, token) => getUserBookings(email, token),
    onSuccess: () => {
      if (userBookings && !bookingLoading) {
        const { bookedVisits } = userBookings.data.data;
        setUserDetails((prev) => ({
          ...prev,
          bookings: [...prev.bookings, ...bookedVisits],
        }));
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) mutate(user?.email, token);
  }, [isAuthenticated]);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader
          hight={80}
          width={80}
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="paddings flexColCenter innerWidth properties-container">
        <SearchBar />
        <div className="paddings flexCenter properties">
          {data.map((property, index) => (
            <PropertyCard card={property} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
