import React, { useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

import LoaderProgress from '../Common/LoaderProgress';
export default () => {
  useEffect(() => {
    axios
      .post('/user/logout')
      .then((result) => {
        window.location.replace('/');
      })
      .catch((err) => {
        console.log('Error in Logout : ', { ...err });
        if (err.response.data) swal('Error', err.response.data.messag, 'error');
      });
  }, []);

  return <LoaderProgress isLoading={true} />;
};
