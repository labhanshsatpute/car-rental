"use client";

import React from 'react'
import { Tab } from '@headlessui/react'
import { VehicalCard } from '@/components';

const Catalogue = () => {

  const categories = ["Sedan","SUV","Hatchback"];

  return (
    <section className='relative'>
      <div className='container py-10'>

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
              <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-7'>
                <VehicalCard />
                <VehicalCard />
                <VehicalCard />
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