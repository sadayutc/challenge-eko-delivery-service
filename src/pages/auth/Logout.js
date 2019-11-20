import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/userContext';

const Logout = () => {
  const { logoutSuccess } = useUser();

  useEffect(() => {
    toast('Until the next time!');
    logoutSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
