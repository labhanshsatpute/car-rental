"use client";

import { Breadcrumbs, CustomButton } from '@/components';
import { AuthUserLogin } from '@/redux/actions/AuthAction';
import { updateProfile } from '@/services/user';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IoCameraOutline } from "react-icons/io5";
import { toast } from 'react-toastify';

const Settings = () => {

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePriview] = useState('https://innostudio.de/fileuploader/images/default-avatar.png');

  const dispatch = useDispatch();
  
  const handleUploadProfileImage = async () => {
    const data = await updateProfile({
      profileImage: profileImage
    });
    if (data.status) {
      toast.success(data.message);
      dispatch(AuthUserLogin(data.data));
    }
    else {
      toast.error(data.message);
    }
  }

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfileImage(event.target.files[0] as any);
      setProfileImagePriview(URL.createObjectURL(event.target.files[0]));
    }
    else {
      if (auth?.profileImage) {
        setProfileImagePriview(`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${auth.profileImage}`);
      }
      else {
        setProfileImagePriview('https://innostudio.de/fileuploader/images/default-avatar.png');
      }
      setProfileImage(null);
    }
  }

  const auth = useSelector((state: any) => state.AuthReducer);

  useEffect(() => {
    if (auth?.profileImage) {
      setProfileImagePriview(`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${auth.profileImage}`);
    }
  }, [auth]);

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
            label: "Settings",
            path: `/dashboard/settings`,
            active: true
          }
        ]} />
        <div className='container'>
          <div className='lg:py-12 md:py-12 sm:py-10 space-y-10'>

            <div>
              <h1 className='text-4xl font-semibold'>Account Settings</h1>
            </div>


            <div className='grid lg:col-span-3'>
              
                <div className='flex lg:flex-row sm:flex-col items-center lg:justify-start sm:justify-center gap-5'>
                  <div className='h-[100px] w-[100px] rounded-full overflow-clip relative group ring-4 ring-ascent-dark'>
                    <input onChange={(event) => handleProfileImageChange(event)} type="file" name='profileImage' className='absolute h-full w-full cursor-pointer opacity-0 z-10' />
                    <div className='h-full w-full bg-black bg-opacity-20 absolute bottom-0 hidden group-hover:flex items-center justify-center'>
                      <IoCameraOutline size={25} className='stroke-white' />
                    </div>
                    <img src={profileImagePreview} alt="" className='h-full w-auto' />
                  </div>
                  <div className='space-y-[1px]'>
                    <button className='px-4 py-3 text-sm font-medium bg-gray-200 rounded-lg' onClick={() => handleUploadProfileImage()}>Upload Image</button>
                  </div>
                </div>

            </div>
           

          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default Settings