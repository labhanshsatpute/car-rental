"use client"

import { getBrands, deleteBrand } from '@/services/brand';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { FiEdit, FiTrash } from "react-icons/fi";
import { toast } from 'sonner';

const Brand = () => {
  
  const [brands, setBrands] = useState([]);

  const fetchUser = async () => {
    const data = await getBrands();
    if (data.status) {
      setBrands(data.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleDeleteBrand = async (id: any) => {
    if (confirm('Are you sure to delete this brand ?')) {
      const data: any = await deleteBrand(id);
      if (data.status) {
        fetchUser();
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
      },
      {
        name: 'Slug',
        selector: (row: any) => <div className='p-2'><img src={row.logo_url} className='h-[50px] w-[50px]' /></div>,
        sortable: true,
    },
      {
          name: 'Name',
          selector: (row: any) => row.name,
          sortable: true,
      },
      {
          name: 'Slug',
          selector: (row: any) => row.slug,
          sortable: true,
      },
      {
          name: 'Actions',
          selector: (row: any) => <div className='flex items-center justify-center space-x-5'>
            <Link href={`/dashboard/brand/edit/${row._id}`} className='font-medium text-ascent flex items-center justify-center space-x-1.5'><FiEdit strokeWidth={3} /> <span>Edit</span></Link>
            <button onClick={() => handleDeleteBrand(row._id)} className='font-medium text-red-500 flex items-center justify-center space-x-1.5'>
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
              <h1 className="panel-card-title">Brands</h1>
              <p className="panel-card-description">List of all brands in the system</p>
          </div>
          <div>
            <Link href={"/dashboard/brand/add"} className='btn-primary-md'>Add Brand</Link>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={brands} pagination />
        </div>
      </figure>
    </React.Fragment>
  )
}

export default Brand