'use client'

import { Footer, Header } from '@/components'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AuthUserLogin, AuthUserLogout } from '@/redux/actions/AuthAction';
import { getCookie, hasCookie } from 'cookies-next';
import 'react-toastify/dist/ReactToastify.css';
import MobileSidebar from '@/components/Common/MobileSidebar/MobileSidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const dispatch = useDispatch();

  const [sidebarState, setSidebarState] = useState(true);

  if (hasCookie('accessToken')) {
    const accessToken = getCookie('accessToken');
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
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
      <Header toggleSidebar={() => setSidebarState(!sidebarState)} />
      <MobileSidebar state={sidebarState} toggleSidebar={() => setSidebarState(false)} />
      <main className='overflow-x-hidden mt-[100px]'>
        {children}
      </main>
      <Footer />
      <ToastContainer position='top-center' />
    </React.Fragment>
  )
}