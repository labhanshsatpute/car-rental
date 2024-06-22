"use client"

import { deleteVehicle, getAllVehicles } from '@/services/vehicle';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FiEdit, FiExternalLink, FiTrash } from "react-icons/fi";
import { toast } from 'sonner';

const Vehicles = () => {
  
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const data = await getAllVehicles();
    if (data.status) {
      setVehicles(data.data);
    }
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDeleteVehicle = async (id: any) => {
    if (confirm('Are you sure to delete this vehicle ?')) {
      const data: any = await deleteVehicle(id);
      if (data.status) {
        fetchVehicles();
        toast.success(data.message);
      }
      else {
        toast.error(data.message);
      }
    }
  }

  const columns = [
      {
          name: 'Sr. No.',
          selector: (row: any, index: any) => index + 1,
          sortable: true,
          with: 10
      },
      {
          name: 'Name',
          selector: (row: any) => <Link href={`/dashboard/vehicle/preview/${row._id}`} className='font-medium hover:text-ascent'>{row.name}</Link>,
          sortable: true,
      },
      {
          name: 'Brand',
          selector: (row: any) => row.brand?.name,
          sortable: true,
      },
      {
          name: 'Price',
          selector: (row: any) => `${process.env.NEXT_PUBLIC_APP_CURRENCY + row.price?.$numberDecimal}/${row.priceUnit.toLowerCase()}`,
          sortable: true,
      },
      {
          name: 'Type',
          selector: (row: any) => row.type,
          sortable: true,
      },
      {
          name: 'Engine',
          selector: (row: any) => row.engineType,
          sortable: true,
      },
      {
          name: 'Actions',
          selector: (row: any) => <div className='flex items-center justify-center space-x-5'>
            <Link href={`/dashboard/vehicle/edit/${row._id}`} className='font-medium text-ascent flex items-center justify-center space-x-1.5'><FiEdit strokeWidth={3} /> <span>Edit</span></Link>
            <button onClick={() => handleDeleteVehicle(row._id)} className='font-medium text-red-500 flex items-center justify-center space-x-1.5'>
              <FiTrash strokeWidth={3} /> <span>Delete</span>
            </button>
          </div>,
          sortable: false,
      },
    ];

  return (
    <React.Fragment>
      <figure className='panel-card'>
        <div className='panel-card-header'>
          <div>
              <h1 className="panel-card-title">Vehicles</h1>
              <p className="panel-card-description">List of all vehicles in the system</p>
          </div>
          <div>
            <Link href={"/dashboard/vehicle/add"} className='btn-primary-md'>Add Vehicle</Link>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={vehicles} pagination />
        </div>
      </figure>
    </React.Fragment>
  )
}

export default Vehicles