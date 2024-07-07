"use client";

import { Breadcrumbs } from '@/components';
import { getLoggedInDevices, logoutDevice } from '@/services/user';
import { getCookie } from 'cookies-next';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Devices = () => {

  const DeviceCard = ({ data }: {
    data: {
      _id: string;
      ipAddress: string;
      operatingSystem: string;
      createdAt: string;
      token: string;
    }
  }) => {
  
    return (
      <React.Fragment>
        <figure className='shadow-sm rounded border'>
          <div className='p-3 space-y-1'>
            <div className='flex items-center justify-start gap-2'>
              <h5 className='font-semibold text-base'>{data.operatingSystem}</h5>
              { getCookie('accessToken') === data.token && <div className='bg-green-200 w-fit px-1.5 py-0.5 rounded'>
                <p className='text-[0.65rem] font-medium text-green-900'>This Device</p>
              </div> }
            </div>
            <div className='space-y-1'>
              <p className='text-xs text-gray-500'>Logged in on {moment(data.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
              <p className='text-xs text-gray-500'>IP Address : {data.ipAddress}</p>
            </div>
            { getCookie('accessToken') !== data.token && <button onClick={() => handleLogoutDevice(data._id)} className='text-red-500 font-medium text-xs flex items-center space-x-1'>
              <span>Logout</span>
              <FiLogOut strokeWidth={4} size={10} />
            </button> }
            
          </div>
        </figure>
      </React.Fragment>
    )
  }

  const handleLogoutDevice = async (id: string) => {
    if (confirm('Are you sure to logout on this device ?')) {
      const data = await logoutDevice(id);
      if (data.status) {
        fetchDevices();
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    }
  } 

  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    const data = await getLoggedInDevices();
    if (data.status) {
      setDevices(data.data);
    }
  }

  useEffect(() => {
    fetchDevices();
  }, []);

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
            active: false
          },
          {
            label: "Devices",
            path: `/dashboard/devices`,
            active: true
          }
        ]} />
        <div className='container'>
          <div className='lg:py-12 md:py-12 sm:py-5 lg:space-y-10 md:space-y-7 sm:space-y-5'>

            <div>
              <h1 className='lg:text-3xl md:text-2xl sm:text-xl font-semibold'>Active Devices</h1>
            </div>

            <div className='flex flex-col gap-3'>
              {devices.map((device: any) => <DeviceCard key={device._id} data={device} />)}
            </div>


          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Devices