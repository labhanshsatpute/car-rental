import Link from 'next/link';
import React from 'react';
import { IoChevronForward } from "react-icons/io5";

const Breadcrumbs = ({ crumbs }: {
  crumbs: Array<{
    label: string
    path: string
    active: boolean
  }>
}) => {
  return (
    <React.Fragment>
      <div className='bg-gray-50 border-b border-b-gray-100'>
        <div className='container lg:py-5 sm:py-4'>

          <ul className='font-medium opacity-70 lg:text-sm md:text-sm sm:text-xs flex items-center space-x-1'>
            <li><Link href={"/"}>Home</Link></li>
            {crumbs.map((item, index) => 
              <React.Fragment key={index}>
                <li><IoChevronForward size={14} /></li>
                <li><Link className={item.active ? 'text-ascent' : 'text-black'} href={item.path}>{item.label}</Link></li>
              </React.Fragment>
            )}
          </ul>

        </div>
      </div>
    </React.Fragment>
  )
}

export default Breadcrumbs
