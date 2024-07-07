"use client";

import { Breadcrumbs, CustomButton } from '@/components';
import { AuthUserLogin } from '@/redux/actions/AuthAction';
import { updateProfile } from '@/services/user';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Settings = () => {

  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();
  
  const handleUploadProfileImage = async () => {
    const data = await updateProfile({
      profileImage: profileImage
    });
    dispatch(AuthUserLogin(data.data));
  }

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfileImage(event.target.files[0] as any);
    }
    else {
      setProfileImage(null);
    }
  }

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
            label: "Settings",
            path: `/dashboard/settings`,
            active: true
          }
        ]} />
        <div className='container'>
          <div className='lg:py-12 md:py-12 sm:py-5'>


            <div className='grid lg:col-span-3'>
              
                <div className='flex lg:flex-row md:flex-row sm:flex-col lg:items-center md:items-center sm:items-start gap-4'>
                  <div className='h-[90px] w-[90px] rounded-full overflow-clip border'>
                    <img src={auth.profileImage ? `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${auth.profileImage}` : 'https://innostudio.de/fileuploader/images/default-avatar.png'} alt="" className='h-auto w-auto' />
                  </div>
                  <div className='space-y-[1px]'>
                    <input onChange={(event) => handleProfileImageChange(event)} type="file" name='profileImage' />
                    <CustomButton handleClick={() => handleUploadProfileImage()} text='Update Profile' />
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