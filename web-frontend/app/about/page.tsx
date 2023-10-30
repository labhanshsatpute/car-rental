'use client'

import React from 'react'
import { useSelector } from 'react-redux'

const page = () => {

  const auth = useSelector((state: any) => state.AuthReducer);

  console.log(auth);

  return (
    <div>
      {auth ? auth.name : "Logged out"}
    </div>
  )
}

export default page