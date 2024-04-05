"use client"

import { getBrands } from '@/services/brand';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

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
          name: 'Slug',
          selector: (row: any) => <Link href={`/dashboard/brand/edit/${row._id}`}>Edit Brand</Link>,
          sortable: true,
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