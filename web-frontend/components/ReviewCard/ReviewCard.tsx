import React from 'react'
import { FaStar } from "react-icons/fa";

interface reviewProps {
  data: {
    date: string;
    rating: number;
    name: string;
    image: string;
    summary: string;
  }
};

const ReviewCard = ({ data }: reviewProps) => {
  return (
    <React.Fragment>
      <figure className='rounded-md bg-slate-50'>
        <div className='p-2.5 space-y-2'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center justify-start gap-2'>
              <div className='h-[40px] w-[40px] rounded-full border overflow-clip flex items-center justify-center'>
                <img src={data.image} alt="user-img" className='h-[40px] w-auto' />
              </div>
              <div>
                <h6 className='text-sm font-medium'>{data.name}</h6>
                <p className='text-[0.7rem] text-gray-500'>{data.date}</p>
              </div>
            </div>
            <div>
              <p className='px-1.5 py-0.5 bg-green-600 text-white text-xs font-medium rounded flex  items-center space-x-1'>
                <span>{data.rating}</span>
                <FaStar size={12} className='text-white' />
              </p>
            </div>
          </div>
          <div>
            <p className='text-[0.65rem] text-gray-600'>{data.summary}</p>
          </div>
        </div>
      </figure>
    </React.Fragment>
  )
}

export default ReviewCard
