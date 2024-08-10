"use client"
import React from 'react'
import SideBar from './sidebar'
import Pichart from './pichart'
import Tables from './tables'
import Charts from './chart'
import Cards from './card'
import Layout from './layout'
function page() {
  return (
    
    <div className=' flex w-fit'>
      {/* <SideBar/> */}

<div><Cards/>
<Pichart/></div>
<div><Tables/>
<Charts/> </div>
       
    </div>
  )
}

export default page
