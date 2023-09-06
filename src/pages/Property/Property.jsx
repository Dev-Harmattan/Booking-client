import React from 'react';
import './Property.css';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getProperty } from '../../utils/api';
import { PuffLoader } from 'react-spinners';
import { AiFillHeart, AiTwotoneCar } from 'react-icons/ai';
import { FaShower } from 'react-icons/fa';
import { MdMeetingRoom, MdLocationPin } from 'react-icons/md';
import { Map } from '../../components/Map/Map';

export const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').slice(-1)[0];
  console.log(id);
  const { data, isLoading, isError } = useQuery(['residency', id], () =>
    getProperty(id)
  );

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
          <AiFillHeart size={24} color="white" />
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
            <button className="button">Booking your visit</button>
          </div>

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
