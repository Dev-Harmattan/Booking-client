import React from 'react';
import { useQuery } from 'react-query';
import { getAllProperties } from '../utils/api';

export const useProperties = () => {
  const { data, isLoading, isFetched, isError, refetch } = useQuery(
    'allProperties',
    getAllProperties,
    {
      refetchOnWindowFocus: false,
    }
  );
  return { data, isLoading, isError, isFetched, refetch };
};
