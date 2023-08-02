import Image from 'next/image'
import React from 'react'
import { FaTags, FaWallet, FaHeadset } from "react-icons/fa";
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: '600', subsets: ['latin-ext'] })

const Features = () => {
  return (
    <section className='relative'>
      <div className='container lg:pt-20 sm:pt-5 pb-20'>

        <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 lg:gap-20 sm:gap-10 items-center'>

          <figure>
            <Image src={'/images/orange-range-rover.png'} alt='orange-rangerover' width={550} height={300} className='object-contain' />
          </figure>

          <figure className='space-y-10'>
            <div className='space-y-4'>
              <p className='uppercase text-gray-500 tracking-widest font-medium text-base'>BEST SERVICE</p>
              <h1 className={`font-bold lg:text-5xl lg:leading-snug sm:text-4xl sm:leading-snug ${poppins.className}`}>Feel the best experience with our rental deals</h1>
              <hr className='w-[70px] h-2 opacity-100 bg-ascent rounded-full border-ascent' />
            </div>
            <div className='space-y-8'>

              <div className='flex space-x-6 items-center'>
                <div className='bg-slate-50 h-[60px] w-[60px] flex items-center justify-center ring-white ring-4 shadow-[0px_0px_25px] shadow-indigo-200 rounded-xl'>
                  <FaTags size={25} className='fill-ascent' />
                </div>
                <div className='space-y-1'>
                  <h1 className='font-semibold text-xl'>Deals for Every Budget</h1>
                  <p className='text-xs text-gray-500 leading-relaxed'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>

              <div className='flex space-x-6 items-center'>
                <div className='bg-slate-50 h-[60px] w-[60px] flex items-center justify-center ring-white ring-4 shadow-[0px_0px_25px] shadow-indigo-200 rounded-xl'>
                  <FaWallet size={25} className='fill-ascent' />
                </div>
                <div className='space-y-1'>
                  <h1 className='font-semibold text-xl'>Best Price Guaranteed</h1>
                  <p className='text-xs text-gray-500 leading-relaxed'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>

              <div className='flex space-x-6 items-center'>
                <div className='bg-slate-50 h-[60px] w-[60px] flex items-center justify-center ring-white ring-4 shadow-[0px_0px_25px] shadow-indigo-200 rounded-xl'>
                  <FaHeadset size={25} className='fill-ascent' />
                </div>
                <div className='space-y-1'>
                  <h1 className='font-semibold text-xl'>Customer Support 24/7</h1>
                  <p className='text-xs text-gray-500 leading-relaxed'>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
              </div>

            </div>
          </figure>



        </div>

      </div>
    </section>
  )
}

export default Features