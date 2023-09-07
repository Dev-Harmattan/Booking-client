import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';

export const SearchBar = ({ filter, searchFilter }) => {
  return (
    <div className="flexCenter search-bar">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        type="text"
        placeholder="Search for city/name/place"
        value={filter}
        onChange={(e) => searchFilter(e.target.value)}
      />
      <button className="button">Search</button>
    </div>
  );
};
