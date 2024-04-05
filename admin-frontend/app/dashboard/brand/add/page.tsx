"use client"

import { CustomButton, CustomInput, ImageInput } from '@/components'
import { addBrand } from '@/services/brand';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';

const CreateBrand = () => {

  const defaultState = {
    name: '',
    slug: '',
    logo: {},
    logo_url: '/assets/default-thumbnail.png'
  };

  const router = useRouter();

  const [inputFields, setInputFields] = useState(defaultState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
    if (event.target.files && event.target.files.length > 0) {
      setInputFields({ ...inputFields, ['logo_url']: URL.createObjectURL(event.target.files[0]) });
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInputFields({ ...inputFields, ['logo_url']: URL.createObjectURL(event.target.files[0]), ['logo']: event.target.files[0] });
    }
    else {
      setInputFields({ ...inputFields, ['logo_url']: '/assets/default-thumbnail.png', ['logo']: {} });
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await addBrand(inputFields);
    if (data.status) {
      toast.success(data.message);
      setInputFields(defaultState);
      router.push('/dashboard/brand');
    }
    else {
      toast.error(data.message);
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={(event) => handleFormSubmit(event)}>
      <figure className='panel-card'>
        <div className='panel-card-header'>
          <div>
              <h1 className="panel-card-title">Add Information</h1>
              <p className="panel-card-description">Please fill the required fields</p>
          </div>
        </div>
        <div className='panel-card-body'>
          <div className="grid 2xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">

            <CustomInput type='text' name='name' value={inputFields.name} label='Name' placeHolder='Enter Name' handleChange={(event) => handleInputChange(event)} required={true} />

            <CustomInput type='text' name='slug' value={inputFields.slug} label='Slug' placeHolder='Enter Slug' handleChange={(event) => handleInputChange(event)} required={true} />

            <div className='lg:col-span-2 md:col-span-2 sm:col-span-1'>
              <ImageInput thumbnailPath={inputFields.logo_url} handleChange={(event) => handleFileInputChange(event)} value={inputFields.logo} required={true} name='logo' label='Brand Logo' />
            </div>

          </div>  
        </div>
        <div className="panel-card-footer">
          <CustomButton text='Add Brand' type='submit' theme='primary' />
        </div>
      </figure></form>
    </React.Fragment>
  )
}

export default CreateBrand