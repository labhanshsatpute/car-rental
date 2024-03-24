'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AuthUserLogin, AuthUserLogout } from '@/redux/actions/AuthAction';
import { getCookie, hasCookie } from 'cookies-next';
import { Toaster } from 'sonner'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const dispatch = useDispatch();

  if (hasCookie('accessToken')) {
    const accessToken = getCookie('accessToken');
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((response) => {
      if (response.data.status) {
        dispatch(AuthUserLogin(response.data.data));
      }      
    }).catch((error) => {
      dispatch(AuthUserLogout())
    });
  }

  return (
    <React.Fragment>
      {children}
      <Toaster position="top-center" richColors />
    </React.Fragment>
  )
}