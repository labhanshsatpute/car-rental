"use client"

import { Catalogue, Features, Intro } from '@/components'
import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
      <Intro />
      <Catalogue/>
      <Features />
    </React.Fragment>
  )
}
