import { CustomInputProps } from '@/types'
import React from 'react'

const CustomInput = ({ type, placeHolder, value, required, name, label }: CustomInputProps) => {
  return (
    <figure className='flex flex-col space-y-2'>
        <label className='text-xs text-gray-700' htmlFor={name}>
            {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
        </label>
        <input type={type} placeholder={placeHolder} required={required} name={name} className='py-3 px-4 rounded-md text-xs font-medium text-gray-900 border w-full' />
    </figure>
  )
}

export default CustomInput