'use client'
import { IUser } from '@/model/user.model'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/assets/logo.webp'
import { AnimatePresence, motion, scale } from 'framer-motion'
import React, { useState } from 'react'
import { AiOutlinePhone, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { IconType } from 'react-icons'

function Navbar({ user }: { user: IUser }) {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <div className='fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg h-20'>
      <div className='max-w-7xl mx-auto px-6 py-3 flex justify-between items-center'>
        {/* logo */}
        <div
          className='flex items-center gap-2 cursor-pointer'
          onClick={() => router.push('/')}>
          <Image
            src={logo}
            alt='Logo'
            width={40}
            height={40}
            className='rounded-full'
          />
          <span className='text-xl font-semibold hidden sm:inline'>
            MultiCart
          </span>
        </div>
        {user.role == 'user' && (
          <div className='hidden md:flex gap-8'>
            <NavItems label='Home' path='/' router={router} />
            <NavItems label='Categories' path='Category' router={router} />
            <NavItems label='Shop' path='Shop' router={router} />
            <NavItems label='Orders' path='Orders' router={router} />
          </div>
        )}
        {/* Desktop icons */}
        <div className='hidden md:flex items-center gap-6'>
          {user.role == 'user' && (
            <IconBtn
              Icon={AiOutlineSearch}
              onClick={() => router.push('/category')}
            />
          )}
          <IconBtn
            Icon={AiOutlinePhone}
            onClick={() => router.push('/support')}
          />
          <div className='relative'>
            {user?.image ? (
              <Image
                src={user?.image}
                alt='User'
                width={40}
                height={40}
                className='w-10 h-10 rounded-full object-cover border border-gray-700 cursor-pointer'
                onClick={() => setOpenMenu(!openMenu)}
              />
            ) : (
              <IconBtn
                Icon={AiOutlineUser}
                onClick={() => setOpenMenu(!openMenu)}
              />
            )}
            <AnimatePresence>
              {openMenu && <motion.div></motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

// components

interface NavItemProps {
  label: string
  path: string
  router: ReturnType<typeof useRouter>
}

export const NavItems = ({ label, path, router }: NavItemProps) => (
  <motion.button
    className='hover:text-gray-300'
    onClick={() => router.push(path)}>
    {label}
  </motion.button>
)

interface IconBtnProps {
  Icon: IconType
  onClick: () => void
}

export const IconBtn = ({ Icon, onClick }: IconBtnProps) => (
  <motion.button whileHover={{ scale: 1.1 }} onClick={onClick}>
    <Icon size={24} />
  </motion.button>
)
