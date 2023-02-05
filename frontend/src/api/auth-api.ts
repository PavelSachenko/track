import axiosInstance from "../services/axiosInstance";
import { ILoginFormValues } from "../pages/AuthPage/LoginPage/LoginPage";
import { IRecoveryPasswordFormValues } from "../pages/AuthPage/RecoveryPage/RecoveryPasswordForm";
import { IRegisterFormValues } from "../pages/AuthPage/RegisterPage/RegisterPage";

const login = (values: ILoginFormValues) => {
  const Credentials = new FormData();

  Credentials.set('email', values.email);
  Credentials.set('password', values.password);

  return axiosInstance.post('login', Credentials);
};

const sendEmailForRegister = (email: string) => {
  const Credentials = new FormData();

  Credentials.set('email', email);

  return axiosInstance.post('email/verify', Credentials);
};

const isRegisterTokenValid = (token: string) => {
  const Credentials = new FormData();

  Credentials.set('token', token);

  return axiosInstance.post('email/validate-token', Credentials);
};

const register = (values: IRegisterFormValues) => {
  const NewUser = new FormData();

  NewUser.set('name', values.name);
  NewUser.set('token', values.registerToken);
  NewUser.set('type', values.type);
  NewUser.set('password', values.password);
  NewUser.set('password_confirmation', values.password_confirmation);
  values.url && NewUser.set('url', values.url);
  values.phone && NewUser.set('phone', values.phone);
  values.description && NewUser.set('description', values.description);
  values.img && NewUser.set('img', values.img);

  return axiosInstance.post('register', NewUser);
}

const sendEmailToResetPassword = (email: string) => {
  const Credentials = new FormData();

  Credentials.set('email', email);

  return axiosInstance.post('password/email', Credentials);
};

const isResetTokenValid = (token: string) => {
  const Credentials = new FormData();

  Credentials.set('token', token);

  return axiosInstance.post('password/validate-token', Credentials);
};

const resetPassword = (values: IRecoveryPasswordFormValues) => {
  const Credentials = new FormData();

  Credentials.set('token', values.token);
  Credentials.set('password', values.password);
  Credentials.set('password_confirmation', values.password_confirmation);

  return axiosInstance.post('password/reset', Credentials);
};

const isInvitationTokenValid = (token: string) => {
  const Credentials = new FormData();

  Credentials.set('token', token);

  return axiosInstance.post('subscription/check-token', Credentials);
}

const AUTH_API = {
  login,
  register,
  sendEmailForRegister,
  isRegisterTokenValid,
  resetPassword,
  isResetTokenValid,
  sendEmailToResetPassword,
  isInvitationTokenValid
};

export default AUTH_API;