import Image from 'next/image'
import React from 'react'
import { BsApple, BsGooglePlay } from "react-icons/bs";

const Intro = () => {
  return (
    <section className='relative'>
      <div className='container lg:py-20 sm:py-10'>
        <div className='grid lg:grid-cols-2 sm:grid-cols-1 items-center lg:gap-16 sm:gap-6'>

          <figure>
            <div className='space-y-6'>
              <h1 className='lg:text-[3.6rem] sm:text-[2.6rem] font-bold lg:leading-tight sm:leading-tight'>Looking to save more on your rental car?</h1>
              <hr className='w-[100px] bg-orange-400 border-none h-2 rounded-full' />
              <p className=' text-gray-600 lg:text-lg sm:text-base leading-loose'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id debitis iure cupiditate dolore ea quidem eum nisi ipsam eveniet modi.</p>
              <div className='flex lg:space-x-5 sm:space-x-3'>

                <button className='py-3 px-5 rounded-lg flex items-center justify-start space-x-3 shadow-[0px_0px_15px] shadow-gray-200 hover:bg-ascent hover:text-white transition duration-300 ease-in-out hover:ease-in-out'>
                  <div>
                    <BsApple size={25} />
                  </div>
                  <div className='flex flex-col text-left pr-1'>
                    <span className='text-[0.62rem]'>Download from</span>
                    <span className='lg:text-base sm:text-sm font-semibold'>App Store</span>
                  </div>
                </button>

                <button className='py-3 px-5 rounded-lg flex items-center justify-start space-x-3 shadow-[0px_0px_15px] shadow-gray-200 hover:bg-ascent hover:text-white transition duration-300 ease-in-out hover:ease-in-out'>
                  <div>
                    <BsGooglePlay size={23} />
                  </div>
                  <div className='flex flex-col text-left pr-1'>
                    <span className='text-[0.62rem]'>Get it on</span>
                    <span className='lg:text-base sm:text-sm font-semibold'>Google Play</span>
                  </div>
                </button>

              </div>
            </div>
          </figure>

          <figure>
            <div className='relative'>
              <Image src="/images/intro-image.png" width={700} height={50} alt="intr-image" className='object-contain relative z-10' />
              <div className='absolute w-[700px] h-full bg-ascent top-0 z-0 lg:-right-[300px] sm:-right-[500px] rounded-full' />
            </div>
          </figure>

        </div>
      </div>
    </section>
  )
}

export default Intro