import React, { useState } from 'react'

import { Outlet } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';
import AppBar from '../AppBar/AppBar';

const RouteContainer = () => {

  return (
    <div className='w-full flex flex-row bg-[#fafafc] w-full h-screen overflow-x-hidden'>

      <Sidebar />


      <div className='py-2 w-full flex flex-col gap-3 overscroll-y-auto overflow-y-auto overscroll-x-auto overflow-x-auto'>
        <AppBar />

        <div className='px-4'>
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default RouteContainer
