import React, { useContext, useEffect, useState } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import './Properties.css';
import { useProperties } from '../../hooks/useProperties';
import { PuffLoader } from 'react-spinners';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';

export const Properties = () => {
  const [filter, searchFilter] = useState('');
  const { data, isError, isLoading } = useProperties();
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
        <SearchBar filter={filter} searchFilter={searchFilter} />
        <div className="paddings flexCenter properties">
          {data
            .filter(
              (property) =>
                property.title.toLowerCase().includes(filter.toLowerCase()) ||
                property.city.toLowerCase().includes(filter.toLowerCase()) ||
                property.country.toLowerCase().includes(filter.toLowerCase())
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};
