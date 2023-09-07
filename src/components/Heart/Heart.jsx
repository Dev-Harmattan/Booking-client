import { useContext, useEffect, useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { checkFavorites, updateFavorites } from '../../utils/common';
import { toFav } from '../../utils/api';
import UserDetailsContext from '../../../context/UserDetailsContext';
import { useAuthCheck } from '../../hooks/useAuthCheck';

export const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState('white');
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { favorites: favorites, token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  useEffect(() => {
    setHeartColor(() => checkFavorites(id, favorites));
  }, [favorites]);

  const { mutate, isLoading } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favorites: updateFavorites(id, prev.favorites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin() && !isLoading) {
      mutate();
      setHeartColor((prev) => (prev === '#fa3e5f' ? 'white' : '#fa3e5f'));
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};
