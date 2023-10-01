"use client";

import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { CustomButton, LoginModal, SignupModal } from '@/components';
import { AiFillCar } from "react-icons/ai";
import { Transition } from '@headlessui/react';
import { FiMenu } from "react-icons/fi";
import Image from 'next/image';


const Header = () => {

  const [loginModalState, setLoginModalState] = useState(true);

  const [signupModalState, setSignupModalState] = useState(false);

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <React.Fragment>
      <header>
        <nav className='container md:block sm:hidden py-6'>
          <div className='flex items-center justify-between'>

            <Link href={"/"}>
              <Image src={"/images/logo.png"} alt='carshub-logo' height={50} width={160} />
            </Link>

            <div>
              <ul className='flex space-x-5'>
                <li><Link href={"/"} className='nav-link'>Rent a Car</Link></li>
                <li><Link href={"/"} className='nav-link'>Brands</Link></li>
                <li><Link href={"/"} className='nav-link'>About us</Link></li>
                <li><Link href={"/"} className='nav-link'>Contact us</Link></li>
              </ul>
            </div>

            <div className='flex items-center space-x-8'>
              <button onClick={() => setSignupModalState(true)} className='nav-link text-sm font-medium'>Sign up</button>
              <CustomButton text='Sign In' handleClick={() => setLoginModalState(true)} />
            </div>

          </div>
        </nav>

        <nav className=' md:hidden sm:block border-b'>
          <div className='container'>
            <div className='flex items-center justify-between py-4'>

              <div className='flex items-center space-x-3'>
                <button onClick={() => (mobileMenu ? setMobileMenu(false) : setMobileMenu(true))}>
                  <FiMenu size={25} />
                </button>
                <Link href={"/"} className='font-semibold text-xl flex items-center'>
                  <AiFillCar size={30} className='fill-ascent-dark mr-1' />
                  <span className='text-ascent'>Cars</span>
                  <span className='text-ascent-dark'>Hub</span>
                </Link>
              </div>

              <div className='flex items-center space-x-4'>
                <button onClick={() => setSignupModalState(true)} className='nav-link text-sm font-medium'>Sign up</button>
                <CustomButton text='Sign In' handleClick={() => setLoginModalState(true)} />
              </div>

            </div>
            <Transition as={Fragment} show={mobileMenu}>
              <div className='py-5 border-t'>
                <ul className='flex flex-col space-y-5'>
                  <li><Link href={"/"} className='nav-link'>Rent a Car</Link></li>
                  <li><Link href={"/"} className='nav-link'>Brands</Link></li>
                  <li><Link href={"/"} className='nav-link'>About us</Link></li>
                  <li><Link href={"/"} className='nav-link'>Contact us</Link></li>
                </ul>
              </div>
            </Transition>
          </div>

        </nav>
      </header>

      <LoginModal isOpen={loginModalState} closeModal={() => setLoginModalState(false)} />

      <SignupModal isOpen={signupModalState} closeModal={() => setSignupModalState(false)} />
      
    </React.Fragment>
  )
}

export default Header