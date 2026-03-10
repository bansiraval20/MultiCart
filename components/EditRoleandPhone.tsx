'use client'

import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineShop, AiOutlineTool, AiOutlineUser } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'

const EditRoleandPhone = () => {
  const [role, setRole] = useState('')
  const [phone, setPhone] = useState('')
  const roles = [
    { label: 'Admin', value: 'admin', icon: <AiOutlineTool size={40} /> },
    { label: 'Vendor', value: 'vendor', icon: <AiOutlineShop size={40} /> },
    { label: 'User', value: 'user', icon: <AiOutlineUser size={40} /> },
  ]
  const [adminExists, setAdminExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/admin/check-admin')
        setAdminExists(res.data.exists)
      } catch (error) {
        setAdminExists(false)
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    checkAdmin()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!role || !phone){
      alert('Please select a role and enter your phone number')
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post('/api/user/edit-role-phone', {
        role,
        phone
      })
      console.log(result.data)
      setLoading(false)
      router.push('/')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-white/10'>
          <h1 className='text-4xl font-semibold text-center mb-4'>
            Choose Your Role
          </h1>
          <p className='text-center text-gray-300 mb-8 text-base'>
            Select your role and enter your mobile number to continue
          </p>

          <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <input
              type='text'
              maxLength={10}
              required
              className='bg-white/10 border border-white/30 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300'
              placeholder='Enter your Mobile Number'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
              {roles.map((rol) => {
                const isAdminBlocked = rol.value == 'admin' && adminExists
                return (
                  <motion.div
                    whileHover={!isAdminBlocked ? { scale: 1.07 } : {}}
                    onClick={() => {
                      if (isAdminBlocked) {
                        alert(
                          'Admin already exists. You cannot select Admin role.',
                        )
                        return
                      } else {
                        setRole(rol.value)
                      }
                    }}
                    key={rol.value}
                    className={`cursor-pointer p-6 text-center rounded-2xl border transition text-lg font-medium
                      
                        ${
                          role === rol.value
                            ? 'bg-blue-500/40 border-blue-500'
                            : 'bg-white/10 border-white/20 hover:bg-white/20'
                        }
                        ${isAdminBlocked && 'opacity-50 cursor-not-allowed'}
                      `}>
                    <div className='flex justify-center mb-3'>{rol.icon}</div>
                    <p>{rol.value}</p>
                    {isAdminBlocked && (
                      <p className='text-xs text-red-400 mt-2'>
                        Admin already exists
                      </p>
                    )}
                  </motion.div>
                )
              })}
            </div>
            <motion.button
              type='submit'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='mt-5 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300'>
              {loading ? (
                <ClipLoader size={20} />
              ) : (
                <>
                  <span>Submit Now</span>
                  <CircleArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default EditRoleandPhone
