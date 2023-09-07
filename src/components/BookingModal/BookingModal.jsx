import { Button, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React, { useContext, useState } from 'react';
import UserDetailsContext from '../../../context/UserDetailsContext';
import { useMutation } from 'react-query';
import { bookVisit } from '../../utils/api';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

export const BookingModal = ({ modalOpen, setOpen, propertyId, email }) => {
  const [value, setValue] = useState();
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailsContext);

  const handleOnSuccess = () => {
    toast.success('You have successfully booked your visit', {
      position: 'bottom-right',
    });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        { id: propertyId, date: dayjs(value).format('DD/MM/YYYY') },
      ],
    }));
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handleOnSuccess(),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: 'bottom-right' }),
    onSettled: () => setOpen(false),
  });
  return (
    <Modal
      opened={modalOpen}
      onClose={() => setOpen(false)}
      title="Select your day of visit"
      centered
    >
      <div className="flexColCenter" style={{ gap: '2rem' }}>
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button disabled={!value || isLoading} onClick={() => mutate()}>
          Book visit
        </Button>
      </div>
    </Modal>
  );
};
