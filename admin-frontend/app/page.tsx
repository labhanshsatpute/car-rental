import React from 'react'
import { CustomInput, CustomButton } from '@/components';
import { BsArrowRightShort, BsLink45Deg } from 'react-icons/bs';

export default function Home() {
  return (
    <React.Fragment>
      <section>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1'>

          <div className='h-screen relative'>
            <div className='lg:w-6/12 md:w-6/12 sm:w-9/12 mx-auto h-full flex items-center justify-center flex-col space-y-7'>

              <div className='space-y-3 w-full'>
                <h1 className='font-semibold text-ascent text-4xl'>Sign In</h1>
                <p className='text-gray-500 text-sm'>Enter your email and password to sign in!</p>
              </div>

              <div className='w-full space-y-5'>
                <CustomInput name='email' type='email' placeHolder='Email Address' value={''} label='Email Address' required={true} />
                <CustomInput name='password' type='password' placeHolder='Password' value={''} label='Password' required={true} />
                <div className='text-right'>
                  <a href="#" className='link text-xs'>Forgot password?</a>
                </div>
                <CustomButton type='submit' text='Submit' styles='w-full' theme='primary' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} className='ml-1' />
                } />
              </div>

            </div>
            <div className='absolute bottom-0 text-center w-full p-5'>
              <p className='text-xs text-gray-400'>© 2022 Horizon UI. All Rights Reserved. Made with love by Simmmple!</p>
            </div>
          </div>

          <figure className='lg:block md:block sm:hidden'>
            <div className='h-screen bg-cover bg-center bg-no-repeat' style={{ backgroundImage: "url('/assets/login-bg.png')" }}>
              <div className='h-full p-20 flex items-center justify-center flex-col space-y-7'>
                <div className='text-center space-y-3'>
                  <img src="/assets/logo-white.png" alt="logo" className='h-[50px] w-auto mx-auto' />
                  <p className='text-gray-100 text-xs leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisic. <br />Fuga, consequuntur reprehenderit.</p>
                </div>
                <div className='text-center space-y-3'>
                  <CustomButton type='submit' text='Visit Website' theme='light' rightIcon={<BsLink45Deg size={20} className='ml-1' strokeWidth={0.4} />} />
                </div>
              </div>
            </div>
          </figure>

        </div>
      </section>
    </React.Fragment>
  )
}
