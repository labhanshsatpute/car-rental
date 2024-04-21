"use client";

import React, { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { VehicalCard } from '@/components';
import { Poppins } from 'next/font/google'
import { getAllVehicles } from '@/services/vehicle';

const poppins = Poppins({ weight: '600', subsets: ['latin-ext'] })


const Catalogue = () => {

  const categories = ["Sedan","SUV","Hatchback"];

  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const data = await getAllVehicles();
    console.log(data);
    if (data.status) {
      setVehicles(data.data);
    }
  }

  useEffect(() => {
    fetchVehicles();
  },[]);

  return (
    <section className='relative'>
      <div className='container py-10 space-y-7'>

        <div className='text-center lg:w-6/12 sm:w-full mx-auto space-y-2'>
          <h1 className={`font-bold text-3xl leading-snug text-ascent-dark ${poppins.className}`}>Get the best car for your trip</h1>
          <p className='text-xs text-gray-500 leading-normal'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim impedit esse rerum exercitationem.</p>
        </div>

        <Tab.Group>
          <Tab.List className={"catalogue-tabs lg:mb-10 sm:mb-5"}>
            {categories?.map((category) => (
              <Tab key={category} className={({ selected }: { selected: Boolean }) => (selected && 'catalogue-tab-active')}>
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7'>
                {vehicles.map((item, index) => <VehicalCard key={index} data={item} /> )}
                
              </div>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>


      </div>
    </section>
  )
}

export default Catalogue