import React from 'react';
import { Avatar, Menu } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export const MenuProfile = ({ user, logout }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} radius="xl" />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => navigate('./favorites', { replace: true })}>
          Favorites
        </Menu.Item>

        <Menu.Item onClick={() => navigate('./bookings', { replace: true })}>
          Bookings
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
