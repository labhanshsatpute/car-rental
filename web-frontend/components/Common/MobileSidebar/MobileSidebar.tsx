import Link from 'next/link';
import React, { useState } from 'react'
import { IoChevronForward } from "react-icons/io5";
import { AuthDropdown, CustomButton, LoginModal, SignupModal } from '@/components';

const SidebarTabLink = ({ label, link }: {
  label: String;
  link: String;
}) => {
  return (
    <React.Fragment>
      <Link href={link}>
        <div className='flex items-center justify-between w-full p-5'>
          <span className='font-medium text-base'>{label}</span>
          <IoChevronForward size={25} />
        </div>
      </Link>
    </React.Fragment>
  )
}

const SidebarTabButton = ({ label, callBackFunction }: {
  label: String;
  callBackFunction: () => void;
}) => {
  return (
    <React.Fragment>
      <button onClick={callBackFunction} className='w-full'>
        <div className='flex items-center justify-between w-full p-5'>
          <span className='font-medium text-base'>{label}</span>
          <IoChevronForward size={25} />
        </div>
      </button>
    </React.Fragment>
  )
}

const MobileSidebar = ({ sidebarState, toggleSidebar }: {
  sidebarState: Boolean;
  toggleSidebar: () => void;
}) => {

  const [loginModalState, setLoginModalState] = useState(false);

  const [signupModalState, setSignupModalState] = useState(false);

  return (
    <React.Fragment>
      <aside className={`mobile-sidebar ${sidebarState && 'active'}`}>
        <div className='relative'>
          <div className='sidebar-content flex flex-col lg:pt-[92px] md:pt-[92px] sm:pt-[71px]'>
            <div className='h-full relative overflow-y-auto'>
              <SidebarTabLink label={"Rent a Car"} link={"/"} />
              <hr />
              <SidebarTabLink label={"About us"} link={"/"} />
              <hr />
              <SidebarTabLink label={"Contact us"} link={"/"} />
              <hr />
              <SidebarTabLink label={"Support"} link={"/"} />
              <hr />
              <SidebarTabButton label={"Already have an Account"} callBackFunction={() => setLoginModalState(true)} />
              <hr />
              <SidebarTabButton label={"Create a new Account"} callBackFunction={() => setSignupModalState(true)} />
              <hr />
            </div>
            <div className='relative bottom-0 h-auto bg-white text-center p-2'>
              <p className='text-[0.6rem] text-gray-500'>Copyright © CarsHub 2023. All Rights Reserved</p>
            </div>
          </div>
          <div className={`sidebar-overlay`} onClick={toggleSidebar} />
        </div>
      </aside>

      <LoginModal isOpen={loginModalState} closeModal={() => setLoginModalState(false)} />
      <SignupModal isOpen={signupModalState} closeModal={() => setSignupModalState(false)} />
    </React.Fragment>
  )
}

export default MobileSidebar
