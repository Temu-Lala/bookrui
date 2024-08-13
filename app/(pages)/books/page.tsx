 "use client"
import React from 'react'
import ProductsList from './ProductsList'
import Navbar from '../../components/navBar'
import Footer from '../../components/footer'
function page() {
  return (
    <div>
      <Navbar/>
      <ProductsList/>
      <Footer/>
    </div>
  )
}

export default page
