import { call, put, takeLatest } from 'redux-saga/effects';
import {
  USER_AUTHENTICATE,
  USER_AUTHENTICATED,
  USER_INFO_FETCH,
  USER_SIGNED_UP_FAILED,
  USER_SIGNED_UP_SUCCESS,
  USER_SIGN_UP,
  USER_UNAUTHORIZED,
} from './actionTypes';
import api from '../../services/api';
import {
  AuthenticateAction,
  AuthenticationResponse,
  GetUserInfoAction,
  SignUpAction,
  UserResponse,
} from './types';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function* authenticate(action: AuthenticateAction) {
  const { value, successCallback, errorCallback } = action.payload;
  try {
    const response: AuthenticationResponse = yield call(() =>
      api.post('api/accounts/login', value)
    );
    yield call(() => localStorage.setItem('token', response.data.token));
    yield put({ type: USER_AUTHENTICATED });

    // Get user info
    yield call(getUserInfo, {
      type: USER_INFO_FETCH,
      payload: {
        successCallback,
        errorCallback,
      },
    });
  } catch (err) {
    yield put({ type: USER_UNAUTHORIZED });
  }
}

function* signUp(action: SignUpAction) {
  const { value, successCallback, errorCallback } = action.payload;
  try {
    yield call(() => api.post('api/accounts/register', value));
    yield put({ type: USER_SIGNED_UP_SUCCESS });
    successCallback?.();
  } catch (err) {
    yield put({ type: USER_SIGNED_UP_FAILED });
    errorCallback?.();
  }
}

function* getUserInfo(action: GetUserInfoAction) {
  const { successCallback, errorCallback } = action.payload;

  try {
    const userResponse: UserResponse = yield call(() => api.get('api/users'));

    if (userResponse.data.user)
      yield call(() =>
        localStorage.setItem('userInfo', JSON.stringify(userResponse.data.user))
      );
    successCallback?.();
  } catch (e) {
    errorCallback?.();
  }
}

export default function* userSaga() {
  yield takeLatest(USER_AUTHENTICATE, authenticate);
  yield takeLatest(USER_INFO_FETCH, getUserInfo);
  yield takeLatest(USER_SIGN_UP, signUp);
}
