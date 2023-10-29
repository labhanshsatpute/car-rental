'use client'

import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Menu, Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { AuthUserLogout } from '@/redux/actions/AuthAction'
import { deleteCookie } from 'cookies-next'

const AuthDropdown = ({ auth }: {
  auth: any
}) => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    deleteCookie('accessToken');
    dispatch(AuthUserLogout());
  }

  return (
    <React.Fragment>
      <div className='relative'>
        <Menu>
          <Menu.Button className='flex items-center space-x-3 text-left'>
            <div>
              <FaUserCircle size={30} />
            </div>
            <div>
              <h6 className='text-sm font-medium'>{auth.name}</h6>
              <p className='text-[0.6rem]'>{auth.email}</p>
            </div>
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className={'absolute bg-white shadow-lg top-full mt-3 right-0 py-4 px-5 rounded-lg border z-40'}>
              <div className='flex flex-col space-y-2 text-left items-start'>
                <button className='font-medium text-xs whitespace-nowrap'>Account Settings</button>
                <button className='font-medium text-xs whitespace-nowrap'>My Orders</button>
                <button onClick={() => handleLogout()} className='font-medium text-xs whitespace-nowrap'>Logout</button>
              </div>
            </Menu.Items></Transition>
        </Menu>
      </div>
    </React.Fragment>
  )
}

export default AuthDropdown