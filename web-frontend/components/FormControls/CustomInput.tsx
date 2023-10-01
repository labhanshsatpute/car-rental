import { CustomInputProps } from '@/types'
import React from 'react'

const CustomInput = ({ type, placeHolder, value, required, name, label }: CustomInputProps) => {
  return (
    <figure className='flex flex-col space-y-2'>
        <label className='text-xs font-medium text-black' htmlFor={name}>
            {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
        </label>
        <input type={type} placeholder={placeHolder} required={required} name={name} className='py-3 px-4 rounded-md text-xs font-medium text-gray-900 border border-ascent-dark border-opacity-30 bg-indigo-50 bg-opacity-20 w-full placeholder:text-black placeholder:font-normal placeholder:text-opacity-50' />
    </figure>
  )
}

export default CustomInput