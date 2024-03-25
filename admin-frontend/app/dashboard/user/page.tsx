"use client"

import { getAllUser } from '@/services/user';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

const Dashboard = () => {
  
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    const data = await getAllUser();
    if (data.status) {
      setUsers(data.data);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const columns = [
      {
          name: 'Name',
          selector: (row: any) => row.name,
          sortable: true,
      },
      {
          name: 'Phone',
          selector: (row: any) => row.phone,
          sortable: true,
      },
      {
          name: 'Email',
          selector: (row: any) => row.email,
          sortable: true,
      }
    ];

  return (
    <React.Fragment>
      <figure className='panel-card'>
        <div className='panel-card-header'>
          <div>
              <h1 className="panel-card-title">Users</h1>
              <p className="panel-card-description">List of all users in the system</p>
          </div>
        </div>
        <div>
          <DataTable columns={columns} data={users} pagination />
        </div>
      </figure>
    </React.Fragment>
  )
}

export default Dashboard