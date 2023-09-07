import React, { useState, useContext } from 'react';
import './Property.css';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty, removeBooking } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import { FaShower } from 'react-icons/fa';
import { MdMeetingRoom, MdLocationPin } from 'react-icons/md';
import { Map } from '../../components/Map/Map';
import { useAuthCheck } from '../../hooks/useAuthCheck';
import { useAuth0 } from '@auth0/auth0-react';
import { BookingModal } from '../../components/BookingModal/BookingModal';
import UserDetailsContext from '../../../context/UserDetailsContext';
import { Button } from '@mantine/core';
import { toast } from 'react-toastify';
import { Heart } from '../../components/Heart/Heart';

export const Property = () => {
  const [modalOpen, setModalOpen] = useState();
  const { pathname } = useLocation();
  const { user } = useAuth0();
  const id = pathname.split('/').slice(-1)[0];
  const { validateLogin } = useAuthCheck();

  const { data, isLoading, isError } = useQuery(['residency', id], () =>
    getProperty(id)
  );

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));

      toast.success('Booking cancelled', { position: 'bottom-right' });
    },
  });

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
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={id} />
        </div>
        <img src={data?.image} alt="home image" />

        <div className="flexCenter property-details">
          {/* property details left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: '1.5rem' }}>
                $ {data?.price}
              </span>
            </div>
            {/* facilities */}
            <div className="flexStart facilities">
              {/* bathrooms */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.bathrooms} Bathrooms</span>
              </div>

              {/* parkings */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.parkings} Parking</span>
              </div>

              {/* rooms */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.bedrooms} Room/s</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: 'justify' }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: '1rem' }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address} {data?.city} {data?.country}
              </span>
            </div>

            {/* booking button*/}

            {bookings.map((booking) => booking.id).includes(id) ? (
              <>
                <Button
                  disabled={cancelling}
                  onClick={() => cancelBooking()}
                  variant="outline"
                  color="red"
                  w={'100%'}
                >
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{' '}
                  {bookings.filter((booking) => booking.id === id)[0].date}
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpen(true);
                }}
              >
                Booking your visit
              </button>
            )}
          </div>

          <BookingModal
            modalOpen={modalOpen}
            setOpen={setModalOpen}
            propertyId={id}
            email={user?.email}
          />

          {/* right side */}
          {/* <div className="flexColStart right"></div> */}
          <div className="map">
            <Map
              city={data?.city}
              address={data?.address}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
