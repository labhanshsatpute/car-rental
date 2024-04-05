"use client"

import React, { ChangeEvent } from "react";
import { FiUploadCloud } from "react-icons/fi";

interface CustomInputProps {
  value: any;
  required: boolean;
  name: string;
  label: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  thumbnailPath: string;
}

const ImageInput = ({ required, name, label, handleChange, thumbnailPath }: CustomInputProps) => {

  return (
    <figure className='input-group'>
      <label className='input-label' htmlFor={name}>
        {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
      </label>
      <div className="flex space-x-3 my-2">
        <div className="input-box-dragable">
            <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp" onChange={handleChange} name={name} required={required} />
            <FiUploadCloud size={30} />
            <span>Darg and Drop Image Files</span>
        </div>
        <img src={thumbnailPath} alt="thumbnail-img" className="input-thumbnail-preview" />
    </div>
    </figure>
  )
}

export default ImageInput