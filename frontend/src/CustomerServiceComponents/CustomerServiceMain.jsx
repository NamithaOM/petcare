import React from 'react'
import AdminSidebar from '../AdminComponents/AdminSidebar'
import AdminNavbar from '../AdminComponents/AdminNavbar'

function CustomerServiceMain() {
  return (
    <>
    <AdminSidebar/>
    <div className='content'>
        <AdminNavbar/>
    </div>
    </>
  )
}

export default CustomerServiceMain