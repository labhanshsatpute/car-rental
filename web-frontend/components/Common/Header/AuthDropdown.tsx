'use client'

import React, { useState } from 'react'
import { TbLogout, TbClipboardText, TbSettings, TbUserCircle } from 'react-icons/tb';
import { Menu, Transition } from '@headlessui/react'
import LogoutModal from '@/components/Authentication/LogoutModal'
import Link from 'next/link';

const AuthDropdown = ({ auth }: {
  auth: any
}) => {

  const [logoutModalState, setLogoutModalState] = useState(false);
  
  return (
    <React.Fragment>
      <div className='relative'>
        <Menu>
          <Menu.Button className='flex items-center space-x-1 text-left p-1.5 lg:pr-4 bg-gray-100 rounded-lg'>
            <div>
              <TbUserCircle size={32} />
            </div>
            <div className='lg:block md:block sm:hidden'>
              <h6 className='text-xs font-medium'>{auth.name}</h6>
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
              <div className='flex flex-col space-y-3 text-left items-start'>
                <Link href={"/dashboard"} className='font-medium text-xs whitespace-nowrap flex items-center space-x-1 hover:text-ascent transition duration-300 ease-in-out hover:ease-in-out'>
                  <TbSettings size={17} />
                  <span>Account Settings</span>
                </Link>
                <button className='font-medium text-xs whitespace-nowrap flex items-center space-x-1 hover:text-ascent transition duration-300 ease-in-out hover:ease-in-out'>
                  <TbClipboardText size={17} />
                  <span>My Bookings</span>
                </button>
                <button className='font-medium text-xs whitespace-nowrap flex items-center space-x-1 hover:text-ascent transition duration-300 ease-in-out hover:ease-in-out' 
                onClick={() => setLogoutModalState(true)}>
                  <TbLogout size={17} />
                  <span>Logout</span>
                </button>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      <LogoutModal isOpen={logoutModalState} closeModal={() => setLogoutModalState(false)} />

    </React.Fragment>
  )
}

export default AuthDropdown