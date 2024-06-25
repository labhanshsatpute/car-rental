"use client";

import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { AuthDropdown, CustomButton, LoginModal, SignupModal } from '@/components';
import { AiFillCar } from "react-icons/ai";
import { Transition } from '@headlessui/react';
import { FiMenu } from "react-icons/fi";
import Image from 'next/image';
import { useSelector } from 'react-redux';

const Header = ({ sidebarState, toggleSidebar }: {
  sidebarState: Boolean
  toggleSidebar: () => void
}) => {

  const [loginModalState, setLoginModalState] = useState(false);

  const [signupModalState, setSignupModalState] = useState(false);

  const AuthButton = () => {
    const auth = useSelector((state: any) => state.AuthReducer);
    if (auth) {
      return (
        <React.Fragment>
          <AuthDropdown auth={auth}/>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <button onClick={() => setSignupModalState(true)} className='nav-link text-sm font-medium'>Sign up</button>
        <CustomButton text='Sign In' handleClick={() => setLoginModalState(true)} />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <header className='z-50 top-0 fixed w-full bg-white lg:shadow-md md:shadow-md sm:shadow'>
        <nav className='container md:block sm:hidden py-6'>
          <div className='flex items-center justify-between'>

            <Link href={"/"}>
              <Image src={"/images/logo.png"} alt='carshub-logo' height={50} width={160} />
            </Link>

            <div>
              <ul className='flex space-x-5'>
                <li><Link href={"/"} className='nav-link'>Rent a Car</Link></li>
                <li><Link href={"/"} className='nav-link'>Brands</Link></li>
                <li><Link href={"/about"} className='nav-link'>About us</Link></li>
                <li><Link href={"/"} className='nav-link'>Contact us</Link></li>
              </ul>
            </div>

            <div className='flex items-center space-x-8'>
              <AuthButton />
            </div>

          </div>
        </nav>

        <nav className=' md:hidden sm:block border-b'>
          <div className='container'>
            <div className='flex items-center justify-between py-4'>

              <div className='flex items-center space-x-3'>
                <Image src={"/images/logo.png"} alt='carshub-logo' height={50} width={160} />
              </div>

              <div>
                <button onClick={toggleSidebar} className={`mobile-sidebar-toggler ${sidebarState ? 'active' : null }`}>
                  <div/>
                  <div/>
                  <div/>
                </button>
              </div>

            </div>
          </div>

        </nav>
      </header>

      <LoginModal isOpen={loginModalState} closeModal={() => setLoginModalState(false)} />

      <SignupModal isOpen={signupModalState} closeModal={() => setSignupModalState(false)} />
      
    </React.Fragment>
  )
}

export default Header