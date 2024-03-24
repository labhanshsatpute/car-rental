import Link from 'next/link'
import React from 'react'

export default function Home() {
  return (
    <React.Fragment>
     <Link href={'/auth/login'}>Go to Login Screen</Link>
    </React.Fragment>
  )
}
