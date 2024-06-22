"use client"

import { getIndividualVehicle } from '@/services/vehicle';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface vehicleInfo {
  name: string;
  summary: string;
  thumbnailImage: string;
  media: [];
  brandId: string;
  type: string;
  fuelType: string;
  engineType: string;
  transmissionType: string;
  seatingCapacity: string;
  manufacturingYear: string;
  mileage: string;
  price: {
    $numberDecimal: string;
  };
  priceUnit: string;
  location: {
    latitude: string;
    longitude: string;
  };
}

const defaultState: vehicleInfo = {
  name: '',
  summary: '',
  thumbnailImage: '',
  media: [],
  brandId: '',
  type: '',
  fuelType: '',
  engineType: '',
  transmissionType: '',
  seatingCapacity: '',
  manufacturingYear: '',
  mileage: '',
  price: {
    $numberDecimal: '',
  },
  priceUnit: '',
  location: {
    latitude: '',
    longitude: ''
  }
};


const PreviewVehicle = () => {

  const params = useParams();

  const [vehicle, setVehicle] = useState(defaultState);

  const fetchVehicle = async () => {
    const data = await getIndividualVehicle(params.id);
    if (data.status) {
      setVehicle(data.data);
    }
  }

  useEffect(() => {
    fetchVehicle();
  }, []);

  return (
    <React.Fragment>
      <figure className='panel-card'>
        <div className='panel-card-header'>
          <div>
            <h1 className="panel-card-title">Preview Information</h1>
            <p className="panel-card-description">Please fill the required fields</p>
          </div>
        </div>
        <div className='panel-card-body space-y-5'>
          
            <div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-3'>

              <div className='border w-fit rounded-md'>
                <img src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${vehicle.thumbnailImage}`} id="profile" alt="profile" className="h-auto w-full" />
              </div>

              <div className='lg:col-span-2 sm:col-span-1'>
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3'>
                  {vehicle.media.map((item: {
                    type: string
                    path: string
                  }, index) => <div className='border rounded-md'><img key={index} src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${item.path}`} id="profile" alt="profile" className="h-full w-auto" /></div> )}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <h1 className="title">General Information</h1>
              </div>
              <div>
                <table className="font-medium text-sm">
                  <tbody>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Name</td>
                        <td className="pr-7 pb-3">{vehicle.name}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Summary</td>
                        <td className="pr-7 pb-3">{vehicle.summary}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Type</td>
                        <td className="pr-7 pb-3 capitalize">{vehicle.type.toLowerCase()}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Fuel Type</td>
                        <td className="pr-7 pb-3 capitalize">{vehicle.fuelType.toLowerCase()}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Engine Type</td>
                        <td className="pr-7 pb-3 capitalize">{vehicle.engineType.toLowerCase()}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Transmission Type</td>
                        <td className="pr-7 pb-3 capitalize">{vehicle.transmissionType.toLowerCase()}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Seating Capacity</td>
                        <td className="pr-7 pb-3 capitalize">{vehicle.seatingCapacity}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Price </td>
                        <td className="pr-7 pb-3">{process.env.NEXT_PUBLIC_APP_CURRENCY + vehicle.price.$numberDecimal}/{vehicle.priceUnit.toLowerCase()}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Manufacturing Year</td>
                        <td className="pr-7 pb-3">{vehicle.manufacturingYear}</td>
                      </tr>
                      <tr>
                        <td className="pr-7 pb-3 text-gray-400">Mileage</td>
                        <td className="pr-7 pb-3">{vehicle.mileage}/Kmpl</td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>



        </div>
      </figure>
    </React.Fragment>
  )
}

export default PreviewVehicle