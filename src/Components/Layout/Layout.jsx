import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'



export default function Layout() {
  return (<>

    <Sidebar />
    <div className=" sm:ml-64">
      <Outlet />
    </div>

  </>)
}
