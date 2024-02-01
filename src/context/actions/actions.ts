import { AnyAction } from 'redux';
import { authService } from '../../api/services/auth/auth.service';
import moment from 'moment';
import { authStore } from '../auth/store';
import { useBears } from '../store';

export const set_Username = 'username';
export const set_Password = 'password';

const setClientToken = () => {
  // const setStoreToken = authStore(state => state.setToken);

  authService.getClientCredentialToken().then((res: any) => {
    const access_token_date: Date = moment(new Date())
      .add(Number(res.expires_in), 'seconds')
      .toDate();
    // setStoreToken(res.access_token);
  });
};

// const updateCCToken = (res: any) => {
//   return (dispatch: (action: AnyAction) => void) => {
//     const access_token_date: Date = moment(new Date())
//       .add(Number(res.expires_in), 'seconds')
//       .toDate();
//     dispatch({
//       type: auth.CLIENT_TOKEN,
//       data: { ...res, access_token_date: access_token_date },
//     });
//   };
// };
export const auth = {
  CLIENT_TOKEN: 'CLIENT_TOKEN',
};

export const authAction = { setClientToken };
