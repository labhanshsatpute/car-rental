"use client";

import Link from 'next/link';
import React from 'react'
import { FiSettings, FiLogOut, FiBell, FiExternalLink } from "react-icons/fi";
import { Menu, Transition } from '@headlessui/react'

const NotificationItem = () => {
  return (
    <React.Fragment>
      <a className="notification-item">
        <div className="notification-body">
          <div className="icon"><FiBell /></div>
          <div className="content">
            <h1 className="title">Interior Designing Quote Request</h1>
            <p className="description">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            <p className="time">2 months ago</p>
          </div>
        </div>
      </a>
    </React.Fragment>
  );
}

const NotificationDropdown = () => {
  return (
    <React.Fragment>
      <div className="relative">
        <Menu>
          <Menu.Button className='h-[40px] w-[40px] hover:bg-complement rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:ease-in-out border border-gray-200'>
            <FiBell size={20} />
          </Menu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items className={'absolute lg:-right-2 sm:-right-14 z-10 mt-5 md:w-auto sm:w-[360px] origin-top-right rounded-xl bg-white shadow-lg overflow-clip text-left border'}>
              <div className="border-b p-5 flex items-center space-x-5 justify-between">
                <div>
                  <h1 className="text-base font-semibold">Notifications</h1>
                  <p className="text-xs text-slate-500 whitespace-nowrap">You have 2 unread notifications</p>
                </div>
                <div>
                  <button className="font-medium text-sm whitespace-nowrap text-ascent hover:text-ascent-dark">Mark all as read</button>
                </div>
              </div>
              <div>
                <NotificationItem />
                <NotificationItem />
              </div>
              <div className="p-5 flex items-center space-x-12 justify-between">
                <a href="#" className="link text-sm flex items-start justify-center w-fit space-x-1.5">
                  <span>View all notifications</span>
                  <span><FiExternalLink size={16} strokeWidth={2.4} /></span>
                </a>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </React.Fragment>
  )
}

export default NotificationDropdown
