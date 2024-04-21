"use client";

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment } from 'react'
import { LiaTimesCircle } from "react-icons/lia";
import { GiCartwheel } from "react-icons/gi";
import { PiSteeringWheelFill } from "react-icons/pi";
import { BsFuelPumpFill } from "react-icons/bs";
import { CustomButton, CustomInput } from "@/components";
import { BsArrowRightShort } from "react-icons/bs";

interface VehicelPreviewModalProps {
  isOpen: boolean;
  closeModal: () => void;
  data: {
    name: string;
    summary: string;
    thumbnailImageUrl: string
    type: string
    fuelType: string
    engineType: string
    transmissionType: string
    seatingCapacity: number
    manufacturingYear: string
    price: {
      $numberDecimal: number
    }
    mileage: number
    priceUnit: string
    brand: {
      name: string,
      logo: string
    }
  }
}

const VehicelPreviewModal = ({ isOpen, closeModal, data }: VehicelPreviewModalProps) => {
  return (
    <React.Fragment>
      <Transition appear as={Fragment} show={isOpen} >
        <Dialog as='div' className={'relative z-50'} onClose={closeModal}>

          {/* BackDrop Overlay */}
          <Transition.Child
            as={Fragment}
            enter='ease-in-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in-out duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-30' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='min-h-full flex items-center justify-center p-4 text-center'>

              {/* Modal Dialog */}
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0 scale-90'
                enterTo='opacity-100 scale-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-90'>
                <Dialog.Panel className={"relative w-full bg-white max-w-2xl max-h-[90vh] overflow-y-auto transform rounded-lg shadow-[0px_0px_50px_rgba(0,0,0,0.4)] flex flex-col gap-10 lg:p-7 sm:p-5 text-left"}>
                  <div className='absolute top-3 right-3'>
                    <button className='p-1 bg-gray-200 rounded-full' onClick={closeModal}>
                      <LiaTimesCircle size={25} className='fill-gray-500' />
                    </button>
                  </div>
                  <div className='lg:space-y-5 sm:space-y-4'>
                    <div className='space-y-3'>
                      <div className='border rounded-lg'>
                        <img src={data.thumbnailImageUrl} alt='vehical-image' height={200} width={300} className='object-contain w-full' />
                      </div>
                      {/* <div className='grid grid-cols-3 gap-3'>
                        <div className='border rounded'>
                          <Image src={"/images/porsche-panamera.png?v=1"} alt='vehical-image' height={200} width={300} className='object-contain w-full' />
                        </div>
                        <div className='border rounded'>
                          <Image src={"/images/porsche-panamera.png?v=1"} alt='vehical-image' height={200} width={300} className='object-contain w-full' />
                        </div>
                        <div className='border rounded'>
                          <Image src={"/images/porsche-panamera.png?v=1"} alt='vehical-image' height={200} width={300} className='object-contain w-full' />
                        </div>
                      </div> */}
                    </div>
                    <div className='space-y-4'>
                      <div className='flex items-center justify-start space-x-3'>
                        <div>
                          <img src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${data.brand.logo}`} alt='brand-logo' height={60} width={30} className='object-contain' />
                        </div>
                        <div className='space-y-[1px]'>
                          <h1 className='font-semibold text-sm'>{data.name}</h1>
                          <h1 className='text-[0.7rem] text-gray-500'>{data.seatingCapacity} Seater - Year {data.manufacturingYear}</h1>
                        </div>
                      </div>
                      <div>
                        <h1 className='font-semibold text-xl text-ascent-dark'>{process.env.NEXT_PUBLIC_APP_CURRENCY}{data.price.$numberDecimal}<span className='text-sm font-normal text-gray-600 capitalize'>/{data.priceUnit.toLowerCase()}</span> </h1>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <div className='flex space-x-2 items-center'>
                          <PiSteeringWheelFill size={16} className='fill-green-600' />
                          <span className='text-xs text-gray-600 capitalize'>{data.transmissionType.toLowerCase()}</span>
                        </div>
                        <div className='flex space-x-2 items-center'>
                          <BsFuelPumpFill size={15} className='fill-orange-500' />
                          <span className='text-xs text-gray-600 capitalize'>{data.fuelType.toLowerCase()}</span>
                        </div>
                        <div className='flex space-x-2 items-center'>
                          <GiCartwheel size={15} className='fill-violet-500' />
                          <span className='text-xs text-gray-600'>{data.mileage}Kmpl</span>
                        </div>
                      </div>
                      <div>
                        <p className='text-gray-500 text-xs leading-normal'>{data.summary}</p>
                      </div>
                      <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                          <CustomInput name='pickupLocation' value='' type='text' placeHolder='Enter Pickup Location' label='Pickup Location' required={true} />
                        </div>
                        <CustomInput name='pickupDateTime' value='' type='datetime-local' label='Pickup Date & Time' required={true} />
                        <CustomInput name='dropDateTime' value='' type='datetime-local' label='Drop Date & Time' required={true} />
                      </div>
                      <div>
                      <CustomButton text='Login to book now' styles='w-full rounded-lg' textStyles='text-sm' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} />} />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              {/* Modal Dialog */}

            </div>
          </div>

        </Dialog>
      </Transition>
    </React.Fragment>
  )
}

export default VehicelPreviewModal