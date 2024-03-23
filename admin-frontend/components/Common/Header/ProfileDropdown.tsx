"use client";

import Link from 'next/link';
import React from 'react'
import { FiSettings, FiLogOut } from "react-icons/fi";
import { Menu, Transition } from '@headlessui/react'

const ProfileDropdown = () => {
  return (
    <React.Fragment>
      <div className="relative">
        <Menu>
          <Menu.Button className='h-[40px] w-[40px] overflow-clip rounded-lg border border-gray-200'>
            <img src="#" alt="profile" />
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className={'absolute -right-2 z-10 mt-5 md:w-auto sm:w-fit origin-top-right rounded-xl bg-white shadow-lg overflow-clip p-5 space-y-4 text-left border'}>
              <button className="flex items-center justify-start w-auto space-x-3.5">
                <div className="w-[50px] h-[50px] rounded-full border overflow-hidden">
                  <img src="#" alt="profile" className="h-full w-full" />
                </div>
                <div className="whitespace-nowrap text-left space-y-0.5">
                  <h1 className="font-semibold text-base">Labhansh Satpute</h1>
                  <h1 className="text-slate-700 text-[0.65rem]">labhansh25@gmail.com</h1>
                </div>
              </button>
              <hr />
              <ul className="flex flex-col space-y-3">
                <li>
                  <a href="#"
                    className="text-sm font-medium text-slate-600 hover:text-ascent whitespace-nowrap flex items-center justify-start">
                    <span className="mr-2"><FiSettings size={17} strokeWidth={2.5} /></span>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <a href="#"
                    className="text-sm font-medium text-slate-600 hover:text-ascent whitespace-nowrap flex items-center justify-start">
                    <span className="mr-2"><FiLogOut size={17} strokeWidth={2.5} /></span>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </React.Fragment>
  )
}

export default ProfileDropdown
