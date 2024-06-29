"use client"
import React from 'react'
import Home from './home/page'
import { useRouter } from 'next/navigation'

function page() {
    const router= useRouter();
  return (
    router.push('/home/')
  )
}

export default page
