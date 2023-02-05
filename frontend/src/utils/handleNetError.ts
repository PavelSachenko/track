import { AxiosError } from 'axios';

import { ROUTES } from '../config/constants';

const handleNetError = (error: AxiosError) => {
  console.log('handleNetError', error.response);

  if (!error.response) {
    console.error('Unhandled error', error);
    return;
  }

  switch (error.response.status) {
    case 500:
      window.location.href = ROUTES.serverError;
      console.log('Server Error!');
      break;
      
    default:
      console.error('Unhandled error', error);
      break;
  }
};

export default handleNetError;
