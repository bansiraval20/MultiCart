'use client'
import React, { useState } from 'react'
import { FaBox, FaCheckCircle, FaShoppingBag } from 'react-icons/fa'
import { FaStore } from 'react-icons/fa6'
import { MdDashboard } from 'react-icons/md'
import { AnimatePresence, motion } from 'framer-motion'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import AdminDashboard from './Dashboard'
import UserOrders from './UserOrders'
import VendorApproval from './VendorApproval'
import ProductApproval from './ProductApproval'
import VendorDetails from './VendorDetails'

const AdminDashBoard = () => {
  const [activePage, setActivePage] = useState('dashboard')
  const [openMenu, setOpenMenu] = useState(false)

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <AdminDashboard />;
      case "vendors": return <VendorDetails />;
      case "orders": return <UserOrders />;
      case "vendor-approval": return <VendorApproval />;
      case "product-approval": return <ProductApproval />;
      default: return <AdminDashboard />;
    }
  }

  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: <MdDashboard size={22} /> },
    { id: 'vendors', label: 'Vendors', icon: <FaStore size={22} /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingBag size={22} /> },
    {
      id: 'vendor-approval',
      label: 'Vendor Approval',
      icon: <FaCheckCircle size={22} />,
    },
    {
      id: 'product-approval',
      label: 'Product Approval',
      icon: <FaBox size={22} />,
    },
  ]

  return (
    <div className='w-full min-h-screen flex bg-linear-to-br from-gray-900 via-black to-gray-900 text-white'>
      {/* Mobile Tab bar */}
      <div className='lg:hidden fixed top-15 left-0 w-full bg-black px-6 py-3 flex justify-between items-center border-b border-gray-700 z-50'>
        <h1 className='text-xl font-bold'>Admin Panel</h1>
        {!openMenu && (
          <button onClick={() => setOpenMenu(true)}>
            <AiOutlineMenu size={25} />
          </button>
        )}
      </div>

      {/* Sidebar for large Area */}
      <motion.div className='hidden lg:block w-72 bg-gray-800/40 border-r border-gray-700 p-6 backdrop-blur-xl mt-18'>
        <h1 className='text-xl font-bold mb-6'>Admin Panel</h1>
        <div className='flex flex-col gap-3'>
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm
                ${activePage === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 bg-gray-800'}`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* sidebar for mobile */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3 }}
            className='lg:hidden fixed top-0 left-0 w-72 h-full bg-gray-800/90 backdrop-blur-xl p-6 z-50 border-r border-gray-700'>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-xl font-bold'>Admin Panel</h1>
              <button onClick={() => setOpenMenu(false)}>
                <AiOutlineClose size={26} />
              </button>
            </div>
            <div className='flex flex-col gap-3'>
              {menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {setOpenMenu(false); setActivePage(item.id);}}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm
                ${activePage === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 bg-black/20'}`}>
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Area  */}
      <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }} 
      className='flex-1 p-10 mt-16 lg:mt-0'>
        {renderPage()}
      </motion.div>
    </div>
  )
}

export default AdminDashBoard