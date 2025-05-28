import React from 'react'
import './css/bootstrap.min.css';
import './css/style.css';
import LoadingSpinner from '../EffectComponents/LoadingSpinner';
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar';
import AdminRecentSales from './AdminRecentSales';
import AdminCards from './AdminCards';
import AdminSalesChart from './AdminSalesChart';
import AdminWidgets from './AdminWidgets';


function AdminMain() {
  return (
    <>
    <LoadingSpinner/>
    <AdminSidebar/>
    <div className='content'>
        <AdminNavbar/>
        <AdminCards/>
        <AdminSalesChart/>
        <AdminRecentSales/>
        <AdminWidgets/>
    </div>
    </>
  )
}

export default AdminMain