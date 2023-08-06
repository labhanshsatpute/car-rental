"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { BsFuelPumpFill } from "react-icons/bs";
import { GiCartwheel } from "react-icons/gi";
import { PiSteeringWheelFill } from "react-icons/pi";
import { CustomButton, VehicelPreviewModal } from "@/components";
import { BsArrowRightShort } from "react-icons/bs";

const VehicalCard = () => {

  const [modalState, setModalState] = useState(false);

  return (
    <React.Fragment>
      <figure className='rounded-2xl overflow-clip shadow-[0px_0px_25px_rgba(0,0,0,0.2)]'>
        <div className='bg-white p-5 space-y-5'>
          <div className='flex items-center justify-start space-x-3'>
            <div>
              <Image src={"/images/porsche.png"} alt='brand-logo' height={80} width={40} className='object-contain' />
            </div>
            <div className='space-y-[1px]'>
              <h1 className='font-semibold text-base'>Porsche Panamera GT</h1>
              <h1 className='text-[0.7rem] text-gray-500'>2 Seater - Year 2020</h1>
            </div>
          </div>
          <div className='flex items-center justify-center w-full'>
            <Image src={"/images/porsche-panamera.png?v=1"} alt='vehical-image' height={200} width={300} className='object-contain' />
          </div>
          <hr />
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start space-x-3'>
              <div className='flex lg:flex-row sm:flex-col lg:space-x-2 sm:space-x-0 lg:space-y-0 sm:space-y-2 items-center'>
                <PiSteeringWheelFill size={16} className='fill-green-600' />
                <span className='text-xs text-gray-600'>Automatic</span>
              </div>
              <div className='flex lg:flex-row sm:flex-col lg:space-x-2 sm:space-x-0 lg:space-y-0 sm:space-y-2 items-center'>
                <BsFuelPumpFill size={15} className='fill-orange-500' />
                <span className='text-xs text-gray-600'>Petrol</span>
              </div>
              <div className='flex lg:flex-row sm:flex-col lg:space-x-2 sm:space-x-0 lg:space-y-0 sm:space-y-2 items-center'>
                <GiCartwheel size={15} className='fill-violet-500' />
                <span className='text-xs text-gray-600'>25/KMPL</span>
              </div>
            </div>
            <div>
              <h1>
              <span className='font-semibold text-lg text-ascent-dark'>{process.env.NEXT_PUBLIC_APP_CURRENCY}300</span>
              <span className='text-left text-gray-800'>/</span>
              <span className='text-sm font-medium text-gray-800'>Hour</span> 
              </h1>
            </div>
          </div>
        </div>
        <div className='p-5 bg-ascent-dark bg-opacity-5'>
          <div className='flex items-center justify-between'>
            <CustomButton handleClick={() => setModalState(true)} text='Check Details' styles='w-full rounded-lg' textStyles='text-sm' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} />} />
          </div>
        </div>
      </figure>

      <VehicelPreviewModal isOpen={modalState} closeModal={() => setModalState(false)} />

    </React.Fragment>


  )
}

export default VehicalCard