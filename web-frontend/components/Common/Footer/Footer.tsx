"use client"

import React from 'react'
import { Poppins } from 'next/font/google'
import Link from 'next/link';
import CustomButton from '../../FormControls/CustomButton';
import { FaStar } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from 'next/image';

const poppins = Poppins({ weight: '500', subsets: ['latin-ext'] });

const Footer = () => {
  return (
    <footer className='lg:pt-16 md:pt-16 sm:pt-10 lg:pb-10 sm:pb-7 bg-gray-50'>
      <div className='container lg:space-y-10 md:space-y-9 sm:space-y-5'>

        <div className='grid lg:grid-cols-4 sm:grid-cols-1 gap-7'>

          <div className='lg:col-span-3'>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-7'>
              <div className='space-y-4'>
                <h1 className='footer-heading'>Our Products</h1>
                <ul className='space-y-3'>
                  <li><Link href={"/"} className='footer-link'>Careers</Link></li>
                  <li><Link href={"/"} className='footer-link'>Hotels</Link></li>
                  <li><Link href={"/"} className='footer-link'>Cars</Link></li>
                  <li><Link href={"/"} className='footer-link'>Packages</Link></li>
                  <li><Link href={"/"} className='footer-link'>Features</Link></li>
                </ul>
              </div>

              <div className='space-y-4'>
                <h1 className='footer-heading'>About CarsHub</h1>
                <ul className='space-y-3'>
                  <li><Link href={"/"} className='footer-link'>Why us</Link></li>
                  <li><Link href={"/"} className='footer-link'>Our Story</Link></li>
                  <li><Link href={"/"} className='footer-link'>Investor Relations</Link></li>
                  <li><Link href={"/"} className='footer-link'>Press Center</Link></li>
                  <li><Link href={"/"} className='footer-link'>Advertise</Link></li>
                </ul>
              </div>

              <div className='space-y-4'>
                <h1 className='footer-heading'>Resources</h1>
                <ul className='space-y-3'>
                  <li><Link href={"/"} className='footer-link'>Download</Link></li>
                  <li><Link href={"/"} className='footer-link'>Help Center</Link></li>
                  <li><Link href={"/"} className='footer-link'>Guides</Link></li>
                  <li><Link href={"/"} className='footer-link'>Partner Network</Link></li>
                  <li><Link href={"/"} className='footer-link'>Developers</Link></li>
                </ul>
              </div>

              <div className='space-y-4'>
                <h1 className='footer-heading'>Information</h1>
                <ul className='space-y-3'>
                  <li><Link href={"/"} className='footer-link'>Privacy Policy</Link></li>
                  <li><Link href={"/"} className='footer-link'>Terms & Conditions</Link></li>
                  <li><Link href={"/"} className='footer-link'>Customer Support</Link></li>
                  <li><Link href={"/"} className='footer-link'>New Offers</Link></li>
                  <li><Link href={"/"} className='footer-link'>My Account</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='space-y-4'>
              <h1 className='footer-heading'>Newsletter</h1>
              <p className='text-xs text-gray-500'>Subscribe to our newsletter for latest updates</p>
              <div className='flex space-x-2'>
                <input type="email" className='px-4 py-3 bg-gray-200 border-none rounded-md outline-none text-sm font-medium placeholder:font-normal' placeholder='Your email address ' />
                <CustomButton type='submit' text='Subscribe' />
              </div>
            </div>
            <div className='space-y-2'>
              <Image src={'/images/google.png'} alt='google-logo' height={30} width={60} />
              <p className='font-medium text-xs'>4.5 Rating from 3.5K customers</p>
              <div className='flex space-x-0.5'>
                <FaStar className='fill-yellow-400' size={17} />
                <FaStar className='fill-yellow-400' size={17} />
                <FaStar className='fill-yellow-400' size={17} />
                <FaStar className='fill-yellow-400' size={17} />
                <FaStar className='fill-gray-300' size={17} />
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div>
          <div className='grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 justify-between gap-5 items-center'>

            <div>
              <Image src={"/images/logo.png"} alt='carshub-logo' className='lg:mx-0 md:mx-0 sm:mx-auto' height={50} width={160} />  
            </div>

            <div className='lg:text-right md:text-right sm:text-center'>
              <p className='text-sm text-gray-500'>Copyright © CarsHub 2023. All Rights Reserved</p>
            </div>

          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer