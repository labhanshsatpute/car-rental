'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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