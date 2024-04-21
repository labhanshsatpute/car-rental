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
  multipleThumbnailPath?: Array<string>;
  multiple: boolean
}

const ImageInput = ({ required, name, label, handleChange, thumbnailPath, multipleThumbnailPath, multiple }: CustomInputProps) => {

  return (
    <figure className='input-group'>
      <label className='input-label' htmlFor={name}>
        {label} {required && <em className='not-italic text-xs font-medium text-red-500'>*</em>}
      </label>
      <div className="flex lg:flex-row md:flex-row sm:flex-col gap-3 my-2">
        <div className="input-box-dragable">
            <input type="file" accept="image/jpeg, image/jpg, image/png, image/webp" onChange={handleChange} name={name} required={required} multiple={multiple} />
            <FiUploadCloud size={30} />
            <span>Darg and Drop Image Files</span>
        </div>
        {multiple ? 
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {multipleThumbnailPath?.map((item, index) => 
            <div className="h-[100px] w-full overflow-clip rounded" key={index}>
              <img src={item} alt="thumbnail-img" className="input-thumbnail-preview" />
            </div>
          )}
        </div> : 
        <div>
          <img src={thumbnailPath} alt="thumbnail-img" className="input-thumbnail-preview" />
        </div>
        }
    </div>
    </figure>
  )
}

export default ImageInput