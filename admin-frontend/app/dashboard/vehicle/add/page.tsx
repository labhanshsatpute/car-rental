"use client"

import { CustomButton, CustomInput, CustomSelect, ImageInput } from '@/components'
import { EngineType, FuelType, PriceUnit, TransmissionType, VehicleType } from '@/constants/vehicleConstant';
import { getBrands } from '@/services/brand';
import { addVehicle } from '@/services/vehicle';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';

const AddVehicle = () => {

  const defaultState = {
    name: '',
    summary: '',
    thumbnailImage: {},
    vehicleImages: [],
    brandId: '',
    type: '',
    fuelType: '',
    engineType: '',
    transmissionType: '',
    seatingCapacity: '',
    manufacturingYear: '',
    price: '',
    priceUnit: '',
    latitude: '',
    longitude: '',
  };

  const [imagePlaceholders, setImagePlaceholders] = useState({
    thumbnailImageUrl: '/assets/default-thumbnail.png',
    mediaImagesUrl: []
  })

  const [inputFields, setInputFields] = useState(defaultState);

  const [brands, setBrands] = useState([]);

  const fetchBrands = async () => {
    const data = await getBrands();
    if (data.status) {
      setBrands(data.data.map((item: any) => {
        return {
          name: item.name,
          value: item._id
        }
      }));
    }
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  }

  const handleThumbnailInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagePlaceholders({ ...imagePlaceholders, ['thumbnailImageUrl']: URL.createObjectURL(event.target.files[0]) });
      setInputFields({ ...inputFields, ['thumbnailImage']: event.target.files[0] });
    }
    else {
      setImagePlaceholders({ ...imagePlaceholders, ['thumbnailImageUrl']: '/assets/default-thumbnail.png' });
      setInputFields({ ...inputFields, ['thumbnailImage']: {} });
    }
  }

  const handleMediaInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInputFields({ ...inputFields, ['vehicleImages']: []  });
    }
    else {
      setInputFields({ ...inputFields, ['vehicleImages']: [] });
    }
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await addVehicle(inputFields);
    if (data.status) {
      toast.success(data.message);
      setInputFields(defaultState);
      router.push('/dashboard/vehicle');
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
            <div className="grid 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-5">

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <h1 className='title'>General Information</h1>
              </div>

              <div className='lg:col-span-2 md:col-span-3 sm:col-span-1'>
                <CustomInput type='text' name='name' value={inputFields.name} label='Name' placeHolder='Enter Name' handleChange={(event) => handleInputChange(event)} required={true} />
              </div>

              <CustomSelect value={inputFields.brandId} name='brandId' label='Brand' handleChange={(event) => handleSelectChange(event)} options={brands} required={true} />

              <CustomSelect value={inputFields.type} name='type' label='Type' handleChange={(event) => handleSelectChange(event)} options={VehicleType} required={true} />

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <CustomInput type='text' name='summary' value={inputFields.summary} label='Summary' placeHolder='Enter Summary' handleChange={(event) => handleInputChange(event)} required={true} />
              </div>

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <br />
                <h1 className='title'>Other Information</h1>
              </div>

              <CustomSelect value={inputFields.fuelType} name='fuelType' label='Fuel Type' handleChange={(event) => handleSelectChange(event)} options={FuelType} required={true} />

              <CustomSelect value={inputFields.engineType} name='engineType' label='Engine Type' handleChange={(event) => handleSelectChange(event)} options={EngineType} required={true} />

              <CustomSelect value={inputFields.transmissionType} name='transmissionType' label='Transmission Type' handleChange={(event) => handleSelectChange(event)} options={TransmissionType} required={true} />
              
              <CustomInput type='text' name='seatingCapacity' value={inputFields.seatingCapacity} label='Seating Capacity' placeHolder='Enter Seating Capacity' handleChange={(event) => handleInputChange(event)} required={true} />
              
              <CustomInput type='text' name='manufacturingYear' value={inputFields.manufacturingYear} label='Manufacturing Year' placeHolder='Enter Manufacturing Year' handleChange={(event) => handleInputChange(event)} required={true} />

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <br />
                <h1 className='title'>Pricing Information</h1>
              </div>

              <CustomInput type='text' name='price' value={inputFields.price} label='Price' placeHolder='Enter Price' handleChange={(event) => handleInputChange(event)} required={true} />

              <CustomSelect value={inputFields.priceUnit} name='priceUnit' label='Pricing Unit' handleChange={(event) => handleSelectChange(event)} options={PriceUnit} required={true} />

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <br />
                <h1 className='title'>Location Information</h1>
              </div>

              <CustomInput type='text' name='latitude' value={inputFields.latitude} label='Latitude' placeHolder='Enter Latitude' handleChange={(event) => handleInputChange(event)} required={false} />

              <CustomInput type='text' name='longitude' value={inputFields.longitude} label='Longitude' placeHolder='Enter Longitude' handleChange={(event) => handleInputChange(event)} required={false} />

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <br />
                <h1 className='title'>Images & Media</h1>
              </div>

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <ImageInput multiple={false} thumbnailPath={imagePlaceholders.thumbnailImageUrl} handleChange={(event) => handleThumbnailInputChange(event)} value={inputFields.thumbnailImage} required={true} name='thumbnailImage' label='Thumbnail Image' />
              </div>

              <div className='lg:col-span-4 md:col-span-3 sm:col-span-1'>
                <ImageInput multiple={true} thumbnailPath={imagePlaceholders.thumbnailImageUrl} handleChange={(event) => handleMediaInputChange(event)} value={inputFields.vehicleImages} required={true} name='vehicleImages' label='Other Media Image' />
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

export default AddVehicle