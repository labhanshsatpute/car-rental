'use client'

import { USER_LOG_IN, USER_LOG_OUT } from "../constants/AuthConstant";

const AuthReducer = (state: any = null, action: any) => {
  switch (action.type) {
    case USER_LOG_IN: {
      state= action.payload
      return state;
    }
    case USER_LOG_OUT: {
      state = null;
      return state;
    }
    default:
      return state;
  }
};

export default AuthReducer;
