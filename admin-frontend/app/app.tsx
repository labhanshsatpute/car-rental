'use client'

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AuthUserLogin, AuthUserLogout } from '@/redux/actions/AuthAction';
import { getCookie, hasCookie } from 'cookies-next';
import { Toaster } from 'sonner'
import LoadingBar from "react-top-loading-bar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

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
      <LoadingBar color='#f11946' progress={progress} />
      {children}
      <Toaster position="top-center" richColors />
    </React.Fragment>
  )
}