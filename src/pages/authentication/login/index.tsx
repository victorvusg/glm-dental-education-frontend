import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

import { authenticate } from 'src/store/user/actions';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/button';
import { APP_ROUTES, APP_MESSAGES, logoUri } from 'src/constants';
import { LoginPayload } from './types';
import Input from 'src/components/input';
import { loginInitialValues } from './constants';
import {
  NotificationMessage,
  useNotification,
} from 'src/hooks/useNotification';
import { UserRole } from 'src/store/user/types';
import { SuccessCallback } from 'src/types';
import { getToken, getUserInfo } from 'src/utils';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const user = getUserInfo();
  const token = getToken();
  const [isNavigated, setIsNavigated] = useState<boolean>(false);
  const { type, notification, notifyError } = useNotification();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: LoginPayload) => {
      setIsLoading(true);

      const successCallback = () => {
        setIsLoading(false);
      };
      const errorCallback = () => {
        setIsLoading(false);
        notifyError(APP_MESSAGES.GENERAL_ERROR);
      };

      dispatch(
        authenticate(values, successCallback as SuccessCallback, errorCallback)
      );
    },
    [dispatch, notifyError]
  );

  useEffect(() => {
    if (token && user && !isNavigated) {
      switch (user.role) {
        case UserRole.STUDENT:
          setIsNavigated(true);
          navigate(APP_ROUTES.NEW_CHAT);
          break;
        case UserRole.SUPERVISOR:
          setIsNavigated(true);
          navigate(APP_ROUTES.EVALUATE);
          break;
        default:
          return;
      }
    }
  }, [isNavigated, navigate, token, user]);

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <div className='flex'>
          <img className='mx-auto h-10 w-auto' src={logoUri} />
        </div>

        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Formik
          initialValues={loginInitialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className='flex flex-col gap-4'>
            <Input id='username' label='User name' />
            <Input type='password' id='password' label='Password' />

            <div className='flex justify-center mt-4'>
              <Button
                type='submit'
                loading={isLoading}
                label='Login'
                onClick={() => {}}
              />
            </div>
          </Form>
        </Formik>

        <NotificationMessage notification={notification} type={type} />

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?
          <a
            onClick={() => navigate(APP_ROUTES.SIGN_UP)}
            href='#'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
