"use client";

import React from 'react'
import { useSelector } from 'react-redux';

export default function Home() {

  const auth = useSelector((state: any) => state.AuthReducer);

  if (!auth) {
    return "Loading...";
  }

  return (
    <React.Fragment>
      <div>
        <div>

          <div className='flex items-center gap-6'>
            <div className='h-[100px] w-[100px] rounded-full overflow-clip border'>
              <img src="https://innostudio.de/fileuploader/images/default-avatar.png" alt="" className='h-auto w-auto' />
            </div>
            <div className='space-y-2'>
              <div>
                <h1 className='font-semibold text-xl'>{auth.name}</h1>
                <p className='text-xs text-gray-600'>{auth.email}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Old Mumbai Highway, Indira Nagar Gachibowoli, Hyderabad</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </React.Fragment>
  )
}
