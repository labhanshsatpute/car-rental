'use client'

import { getIndividualVehicle } from '@/services/vehicle';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { GiCartwheel } from "react-icons/gi";
import { PiSteeringWheelFill } from "react-icons/pi";
import { BsFuelPumpFill } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaUsb, FaBluetooth, FaAirFreshener, FaMusic, FaRegThumbsUp, FaParachuteBox } from "react-icons/fa";
import { TbAirConditioning, TbSteeringWheel } from "react-icons/tb";
import { GiCarDoor } from "react-icons/gi";


import 'swiper/css';
import 'swiper/css/pagination';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import { Breadcrumbs } from '@/components';

interface vehicleInfo {
  name: string;
  summary: string;
  thumbnailImage: string;
  media: [];
  brandId: string;
  type: string;
  fuelType: string;
  engineType: string;
  transmissionType: string;
  seatingCapacity: string;
  manufacturingYear: string;
  mileage: string;
  price: {
    $numberDecimal: string;
  };
  priceUnit: string;
  location: {
    latitude: string;
    longitude: string;
  };
  brand: {
    name: string;
    slug: string;
    logo: string;  
  },
  features: {
    usbCharger: boolean,
    bluetooth: boolean,
    airFreshner: boolean,
    musicSystem: boolean,
    fullBootSpace: boolean,
    airConditioning: boolean,
    powerSteering: boolean,
    powerWindows: boolean,
    airbags: boolean
  },
}

const defaultState: vehicleInfo = {
  name: '',
  summary: '',
  thumbnailImage: '',
  media: [],
  brandId: '',
  type: '',
  fuelType: '',
  engineType: '',
  transmissionType: '',
  seatingCapacity: '',
  manufacturingYear: '',
  mileage: '',
  price: {
    $numberDecimal: '',
  },
  priceUnit: '',
  location: {
    latitude: '',
    longitude: ''
  },
  brand: {
    name: '',
    slug: '',
    logo: ''
  },
  features: {
    usbCharger: false,
    bluetooth: false,
    airFreshner: false,
    musicSystem: false,
    fullBootSpace: false,
    airConditioning: false,
    powerSteering: false,
    powerWindows: false,
    airbags: false
  },
};


const reviews = [
  {
    date: "5th May 2023",
    rating: 3,
    name: "Sham Sharma",
    image: "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus quaerat obcaecati qui delectus! Iusto officia ipsam repellat totam pariatur enim fuga quos tempora praesentium, voluptates temporibus atque cum perferendis."
  },
  {
    date: "5th May 2023",
    rating: 3,
    name: "Sham Sharma",
    image: "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus quaerat obcaecati qui delectus! Iusto officia ipsam repellat totam pariatur enim fuga quos tempora praesentium, voluptates temporibus atque cum perferendis."
  },
  {
    date: "5th May 2023",
    rating: 3,
    name: "Sham Sharma",
    image: "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus quaerat obcaecati qui delectus! Iusto officia ipsam repellat totam pariatur enim fuga quos tempora praesentium, voluptates temporibus atque cum perferendis."
  },
  {
    date: "5th May 2023",
    rating: 3,
    name: "Sham Sharma",
    image: "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus quaerat obcaecati qui delectus! Iusto officia ipsam repellat totam pariatur enim fuga quos tempora praesentium, voluptates temporibus atque cum perferendis."
  },
  {
    date: "5th May 2023",
    rating: 3,
    name: "Sham Sharma",
    image: "https://cdn.vectorstock.com/i/500p/08/19/gray-photo-placeholder-icon-design-ui-vector-35850819.jpg",
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum natus quaerat obcaecati qui delectus! Iusto officia ipsam repellat totam pariatur enim fuga quos tempora praesentium, voluptates temporibus atque cum perferendis."
  }
]

const VehicleInformation = () => {

  const params = useParams();

  const [vehicle, setVehicle] = useState(defaultState);

  const fetchVehicle = async () => {
    const data = await getIndividualVehicle(params.id);
    if (data.status) {
      setVehicle(data.data);
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, []);
  
  return (
    <React.Fragment>
      <Breadcrumbs crumbs={[
        {
          label: "Cars",
          path: `/vehicles`,
          active: false
        },
        {
          label: vehicle.name,
          path: `/vehicle/${params.id}`,
          active: true
        }
      ]} />
      <section>
        <div className='container lg:py-10 sm:py-5'>
          <div className='grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 gap-7'>

            <div className='lg:col-span-4 md:col-span-2 sm:col-span-1'>
              <div className='lg:space-y-5 sm:space-y-3'>

                {/* Vehicle Images (Start) */}
                <div className='border rounded-md overflow-clip'>
                  <Swiper pagination={{ dynamicBullets: true, }} modules={[Pagination]}>
                    {vehicle.media.map((item: {
                    type: string
                    path: string
                  }, index) => <SwiperSlide><img key={index} src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${item.path}`} alt="vehicle-img" className="h-full w-auto" /></SwiperSlide>)}
                  </Swiper>
                </div>
                {/* Vehicle Images (End) */}

                {/* Vehicle Information (Start) */}
                <div className='border rounded-md overflow-clip'>
                  <div className='lg:p-5 sm:p-3 lg:space-y-5 sm:space-y-3'>

                        <div className='space-y-1'>
                          <h1 className='font-semibold lg:text-lg md:text-base sm:text-sm'>{vehicle.name}</h1>
                          <h1 className='lg:text-xs sm:text-[0.65rem] text-gray-500'>{vehicle.seatingCapacity} Seater - Year {vehicle.manufacturingYear}</h1>
                        </div>

                      <div className='flex items-center space-x-4 text-xs'>
                        <div className='flex space-x-2 items-center'>
                          <PiSteeringWheelFill size={16} className='fill-green-600' />
                          <span className='text-gray-600 capitalize'>{vehicle.transmissionType.toLowerCase()}</span>
                        </div>
                        <div className='flex space-x-2 items-center'>
                          <BsFuelPumpFill size={15} className='fill-orange-500' />
                          <span className='text-gray-600 capitalize'>{vehicle.fuelType.toLowerCase()}</span>
                        </div>
                        <div className='flex space-x-2 items-center'>
                          <GiCartwheel size={15} className='fill-violet-500' />
                          <span className='text-gray-600'>{vehicle.mileage}Kmpl</span>
                        </div>
                      </div>

                      <div className='space-y-1'>
                        <p className='font-medium lg:text-sm sm:text-xs'>About this Vehicle</p>
                        <p className='text-xs text-gray-600'>{vehicle.summary}</p>
                      </div>

                  </div>
                </div>
                {/* Vehicle Information (End) */}

                {/* Reviews (Start) */}
                <div className='border rounded-md overflow-clip'>
                  <div className='lg:p-5 sm:p-3 space-y-5'>

                    <div className='space-y-2'>
                      <p className='font-semibold text-sm'>Ratings & Reviews</p>
                      <div className='flex items-center gap-2'>
                        <h1 className='text-4xl font-semibold'>4.89</h1>
                        <div className='space-y-1'>
                          <div className='flex space-x-0.5'>
                            <FaStar size={15} className='fill-yellow-400' />
                            <FaStar size={15} className='fill-yellow-400' />
                            <FaStar size={15} className='fill-yellow-400' />
                            <FaStar size={15} className='fill-yellow-400' />
                            <FaStarHalfAlt size={15} className='fill-yellow-400' />
                          </div>
                          <p className='text-gray-600 text-xs'>Based on 27 Trips</p>
                        </div>
                      </div>
                    </div>

                    <div>
                    <Swiper breakpoints={{
                      576: {
                        spaceBetween: 10,
                        slidesPerView: 1,
                      },
                      768: {
                        spaceBetween: 10,
                        slidesPerView: 3,
                      },
                    }}>
                    {reviews.map((item: {
                      date: string;
                      rating: number;
                      name: string;
                      image: string;
                      summary: string;
                    }, index) => <SwiperSlide><ReviewCard key={index} data={item} />
                    </SwiperSlide>)}
                    </Swiper>
                    </div>

                  </div>
                </div>
                {/* Reviews (End) */}

                {/* Features (End) */}
                <div className='border rounded-md overflow-clip'>
                  <div className='lg:p-5 sm:p-3 space-y-3'>
                    <div className='space-y-1'>
                      <p className='font-semibold text-sm'>Features</p>
                    </div>
                    <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>

                      { vehicle.features.usbCharger && <div className='flex items-center gap-1'>
                        <FaUsb size={15} className='fill-ascent' />
                        <span className='text-xs'>USB charger</span>
                      </div> }

                      { vehicle.features.bluetooth && <div className='flex items-center gap-1'>
                        <FaBluetooth size={15} className='fill-ascent' />
                        <span className='text-xs'>Bluetooth</span>
                      </div> }

                      { vehicle.features.airFreshner && <div className='flex items-center gap-1'>
                        <FaAirFreshener size={14} className='fill-ascent' />
                        <span className='text-xs'>Air Freshener</span>
                      </div> }

                      { vehicle.features.musicSystem && <div className='flex items-center gap-1'>
                        <FaMusic size={14} className='fill-ascent' />
                        <span className='text-xs'>Music System</span>
                      </div> }

                      { vehicle.features.fullBootSpace && <div className='flex items-center gap-1'>
                        <FaRegThumbsUp size={14} className='fill-ascent' />
                        <span className='text-xs'>Full boot space</span>
                      </div> }

                      { vehicle.features.airConditioning && <div className='flex items-center gap-1'>
                        <TbAirConditioning size={14} className='stroke-ascent' />
                        <span className='text-xs'>Air Conditioning</span>
                      </div> }

                      { vehicle.features.powerSteering && <div className='flex items-center gap-1'>
                        <TbSteeringWheel size={14} className='stroke-ascent' />
                        <span className='text-xs'>Power steering</span>
                      </div> }

                      { vehicle.features.powerWindows && <div className='flex items-center gap-1'>
                        <GiCarDoor size={14} className='fill-ascent' />
                        <span className='text-xs'>Power Windows</span>
                      </div> }

                      { vehicle.features.airbags && <div className='flex items-center gap-1'>
                        <FaParachuteBox size={14} className='fill-ascent' />
                        <span className='text-xs'>2 Front Airbags</span>
                      </div> }

                    </div>
                  </div>
                </div>
                {/* Features (End) */}

                {/* Location (End) */}
                <div className='border rounded-md overflow-clip'>
                  <div className='lg:p-5 sm:p-3 space-y-5'>
                    <div className='space-y-1'>
                      <p className='font-semibold text-sm'>Car location</p>
                      <p className='text-xs text-gray-600 leading-5'>8, Chembur West, Sector 1, Chedda Nagar, Mumbai, <br /> Maharashtra 400089, India</p>
                    </div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2053.2493644813526!2d72.8739459953863!3d19.10025469271884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8420d82ed5d%3A0xe439cd441a4ec8dc!2sT2%20Airport%20Rickshaw%20Stand!5e0!3m2!1sen!2sin!4v1719167968326!5m2!1sen!2sin" className='h-[350px] w-full border'></iframe>
                  </div>
                </div>
                {/* Location (End) */}
                
              </div>
            </div>

            <div className='lg:col-span-2 md:col-span-1 sm:col-span-1'>

            </div>

          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default VehicleInformation
