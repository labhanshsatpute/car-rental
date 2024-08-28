"use client";

import { Breadcrumbs } from '@/components';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';
import { FaCog, FaHeadset, FaRoute } from "react-icons/fa";

const DashboardCard = ({ title, path, icon, summary }: {
  title: string;
  path: string;
  summary: string;
  icon: JSX.Element
}) => {
  return (
    <React.Fragment>
      <Link href={path}>
        <figure className='rounded bg-slate-50 shadow-md'>
          <div className='p-4 flex flex-col items-start justify-center space-y-3'>

            <div className='h-12 w-12 bg-ascent flex items-center justify-center rounded-lg bg-opacity-10 text-ascent'>{icon}</div>
            <div className='text-left space-y-0.5'>
              <h5 className='font-semibold text-base text-ascent-dark'>{title}</h5>
              <p className='text-[0.7rem] text-gray-500'>{summary}</p>
            </div>

          </div>
        </figure>
      </Link>
    </React.Fragment>
  )
}

const Dashboard = () => {

  const auth = useSelector((state: any) => state.AuthReducer);

  if (!auth) {
    return "Loading...";
  }

  return (
    <React.Fragment>
      <section>
        <Breadcrumbs crumbs={[
          {
            label: "Dashboard",
            path: `/dashboard`,
            active: true
          }
        ]} />
        <div className='container'>
          <div className='lg:py-12 md:py-12 sm:py-5'>

            <div className='lg:space-y-8 md:space-y-8 sm:space-y-5'>

              <div className='flex lg:flex-row md:flex-row sm:flex-col lg:items-center md:items-center sm:items-start gap-4'>
              <div className='h-[100px] w-[100px] rounded-full overflow-clip relative group ring-4 ring-ascent-dark'>
                  <img src={auth.profileImage ? `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${auth.profileImage}` : 'https://innostudio.de/fileuploader/images/default-avatar.png'} alt="" className='h-auto w-auto' />
                </div>
                <div className='space-y-[1px]'>
                  <h1 className='font-medium text-ascent-dark'>Good Evening,</h1>
                  <h1 className='font-semibold text-xl text-ascent-dark'>{auth.name}</h1>
                  <p className='text-xs text-gray-500'>{auth.email}</p>
                </div>
              </div>

              <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 lg:gap-5 md:gap-5 sm:gap-3'>
                <DashboardCard title='My Bookings' path='/' summary='Manage your bookings & payments' icon={<FaRoute size={20} />} />
                <DashboardCard title='Settings' path='/dashboard/settings' summary='Change your account information' icon={<FaCog size={20} />} />
                <DashboardCard title='Active Devices' path='/dashboard/devices' summary='Check logged in devices' icon={<FaCog size={20} />} />
                <DashboardCard title='Help Center' path='/' summary='Contact with our customer care' icon={<FaHeadset size={20} />} />
              </div>

            </div>

          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Dashboard