"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { BsFuelPumpFill } from "react-icons/bs";
import { BsFillCarFrontFill } from "react-icons/bs";
import { TbManualGearbox } from "react-icons/tb";
import { CustomButton, VehicelPreviewModal } from "@/components";
import { BsArrowRightShort } from "react-icons/bs";
import { HiUsers, HiOutlineLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";

interface VehicleCardProps {
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

const VehicalCard = ({ data }: VehicleCardProps) => {

  const [modalState, setModalState] = useState(false);

  return (
    <React.Fragment>
      <figure className='rounded-lg overflow-clip shadow-[0px_0px_25px_rgba(0,0,0,0.2)]'>
        <div className='bg-white p-5'>
          <div>
            <div className='flex items-center justify-start space-x-3'>
              <div>
                <img src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${data.brand.logo}`} alt="" className='object-contain' height={80} width={40}  />
              </div>
              <div className='space-y-[1px]'>
                <h1 className='font-semibold text-base'>{data.name}</h1>
                <h1 className='text-[0.6rem] text-gray-500'>{data.brand.name} - {data.seatingCapacity} Seater - Year {data.manufacturingYear}</h1>
              </div>
            </div>
            <div className='flex items-center justify-center w-full h-[200px]'>
              <img src={data.thumbnailImageUrl} alt="" height={200} width={300}  />
            </div>
          </div>
          <div className='space-y-4 bg-white'>
            <div className='flex items-end justify-between'>
              <div className='flex items-center space-x-1'>
                <div className='text-[0.65rem] py-1 px-2 bg-orange-400 rounded-full font-medium text-white w-fit capitalize'>{data.type.toLowerCase()}</div>
                <div className='text-[0.65rem] py-1 px-2 bg-ascent-dark bg-opacity-5 rounded-full font-medium text-ascent-dark w-fit flex items-center space-x-1'><HiUsers size={12} /><span>{data.seatingCapacity}</span></div>
                <div className='text-[0.65rem] py-1 px-2 bg-ascent-dark bg-opacity-5 rounded-full font-medium text-ascent-dark w-fit flex items-center space-x-1'><GiSteeringWheel size={12} /><span>150 Trips</span></div>
              </div>
              <div className='text-right'>
                <h1>
                  <span className='font-semibold text-lg text-ascent'>{process.env.NEXT_PUBLIC_APP_CURRENCY}{data.price.$numberDecimal}</span>
                  <span className='text-left text-gray-500'>/</span>
                  <span className='text-xs text-gray-500 capitalize'>{data.priceUnit.toLowerCase()}</span>
                </h1>
                <p className='text-[0.6rem] text-gray-500'>Inclusive All Taxes</p>
              </div>
            </div>
            <div className='p-3.5 bg-white rounded-lg border'>
              <div className='flex items-center justify-around space-x-3'>
                <div className='flex items-center space-x-1.5'>
                  <BsFuelPumpFill size={15} className='fill-ascent-dark' />
                  <span className='text-xs text-ascent-dark font-medium capitalize'>{data.fuelType.toLowerCase()}</span>
                </div>
                <div className='h-[20px] w-[2px] bg-gray-200 rounded-full'/>
                <div className='flex items-center space-x-1.5'>
                  <TbManualGearbox size={16} className='fill-ascent-dark' />
                  <span className='text-xs text-ascent-dark font-medium capitalize'>{data.transmissionType.toLowerCase()}</span>
                </div>
                <div className='h-[20px] w-[2px] bg-gray-200 rounded-full'/>
                <div className='flex items-center space-x-1.5'>
                  <BsFillCarFrontFill size={15} className='fill-ascent-dark' />
                  <span className='text-xs text-ascent-dark font-medium capitalize'>{data.mileage}Kmpl</span>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-xs font-medium text-gray-500 flex items-center space-x-1'><HiOutlineLocationMarker size={15} className='-mt-0.5' /><span>Mumbai, Maharashtra</span></p>
              <p className='text-xs font-medium text-gray-500 flex items-center space-x-1'><span>Average Rating 4.5 </span><FaStar size={13} className='-mt-0.5 fill-yellow-400' /></p>
            </div>
            <div className='flex items-center justify-between'>
              <CustomButton handleClick={() => setModalState(true)} text='Check Details' styles='w-full rounded-lg' textStyles='text-sm' rightIcon={<BsArrowRightShort size={20} strokeWidth={0.5} />} />
            </div>
          </div>
        </div>
      </figure>

      <VehicelPreviewModal isOpen={modalState} data={data} closeModal={() => setModalState(false)} />

    </React.Fragment>


  )
}

export default VehicalCard