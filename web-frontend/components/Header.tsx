"use client";

import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import { CustomButton } from '@/components';
import { AiFillCar } from "react-icons/ai";
import { Transition } from '@headlessui/react';
import { FiMenu } from "react-icons/fi";

const Header = () => {

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header>
      <nav className='container md:block sm:hidden py-5'>
        <div className='flex items-center justify-between'>

          <Link href={"/"} className='font-semibold text-2xl flex items-center'>
            <AiFillCar size={30} className='fill-ascent-dark mr-1' />
            <span className='text-ascent'>Cars</span>
            <span className='text-ascent-dark'>Hub</span>
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
            <Link href={"/"} className='nav-link text-sm font-medium'>Sign up</Link>
            <CustomButton text='Sign In' styles='shadow-lg shadow-indigo-200' />
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
              <Link href={"/"} className='nav-link text-sm font-medium'>Sign up</Link>
              <CustomButton text='Sign In' />
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
  )
}

export default Header