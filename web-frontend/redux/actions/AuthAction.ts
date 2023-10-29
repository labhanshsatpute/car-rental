'use client'
import { USER_LOG_IN, USER_LOG_OUT } from "../constants/AuthConstant";

export const AuthUserLogin = (auth: Object) => ({
  type: USER_LOG_IN,
  payload: auth
});

export const AuthUserLogout = () => ({
  type: USER_LOG_OUT,
  payload: null
});

