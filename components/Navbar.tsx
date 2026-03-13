'use client'
import { IUser } from '@/model/user.model'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import logo from '@/assets/logo.webp'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import {
  AiOutlineAppstore,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlinePhone,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from 'react-icons/ai'
import { IconType } from 'react-icons'
import { signIn, signOut } from 'next-auth/react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

function Navbar({ user }: { user: IUser }) {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
              {openMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className='absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c]'>
                  <DropDownBtn
                    Icon={AiOutlineUser}
                    label='profile'
                    onClick={() => {
                      router.push('/profile')
                      setOpenMenu(false)
                    }}
                  />
                  <DropDownBtn
                    Icon={AiOutlineLogin}
                    label='Sign-in'
                    onClick={() => {
                      signIn()
                      setOpenMenu(false)
                    }}
                  />
                  <DropDownBtn
                    Icon={AiOutlineLogout}
                    label='Sign-out'
                    onClick={() => {
                      signOut()
                      setOpenMenu(false)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {user?.role == 'user' && <CartBtn router={router} count={1} />}
        </div>

        {/* MobileIcon */}
        <div className='md:hidden flex  items-center gap-4'>
          {user?.role == 'vendor' || user?.role == 'admin' ? (
            <>
              <IconBtn
                Icon={AiOutlinePhone}
                onClick={() => router.push('/support')}
              />
              <div className='relative'>
                {user?.image ? (
                  <Image
                    src={user?.image}
                    alt='User'
                    width={32}
                    height={32}
                    className='w-8 h-8 rounded-full object-cover border border-gray-700 cursor-pointer'
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                ) : (
                  <IconBtn
                    Icon={AiOutlineUser}
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                )}
                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className='absolute right-0 mt-3 w-48 backdrop-blur-lg rounded-xl shadow-lg border bg-[#6a69693c]'>
                      <DropDownBtn
                        Icon={AiOutlineUser}
                        label='profile'
                        onClick={() => {
                          router.push('/profile')
                          setOpenMenu(false)
                        }}
                      />
                      <DropDownBtn
                        Icon={AiOutlineLogin}
                        label='Sign-in'
                        onClick={() => {
                          signIn()
                          setOpenMenu(false)
                        }}
                      />
                      <DropDownBtn
                        Icon={AiOutlineLogout}
                        label='Sign-out'
                        onClick={() => {
                          signOut()
                          setOpenMenu(false)
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <IconBtn
                Icon={AiOutlineSearch}
                onClick={() => router.push('/category')}
              />

              <IconBtn
                Icon={AiOutlinePhone}
                onClick={() => router.push('/support')}
              />

              <CartBtn router={router} count={1} />
              <AiOutlineMenu
                size={28}
                className='cursor-pointer'
                onClick={() => setSidebarOpen(true)}
              />

              <AnimatePresence>
                {sidebarOpen && (
                  <motion.div 
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className='fixed top-0 right-0 h-screen w-[65%] bg-black/90 backdrop-blur-lg p-6 text-white'>
                    <div className='flex justify-between items-center mb-6'>
                      <h1 className='text-xl font-semibold'>Menu</h1>
                      <AiOutlineClose size={28} className='cursor-pointer' onClick={()=> setSidebarOpen(false)}/>
                    </div>
                    <div className='flex flex-col gap-4 text-lg'>
                      <SidebarBtn label='Home' path='/' router={router} Icon={AiOutlineHome} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn label='Categories' path='/category' router={router} Icon={AiOutlineAppstore} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn label='shops' path='/shop' router={router} Icon={AiOutlineShop} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn label='profile' path='/profile' router={router} Icon={AiOutlineUser} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtn label='signIn' path='/login' router={router} Icon={AiOutlineLogin} setSidebarOpen={setSidebarOpen}/>
                      <SidebarBtnForSignOut label='signOut' Icon={AiOutlineLogout} setSidebarOpen={setSidebarOpen}/>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
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

interface DropDownBtnProps {
  Icon: IconType
  label: string
  onClick: () => void
}

export const DropDownBtn = ({ Icon, label, onClick }: DropDownBtnProps) => (
  <motion.button
    className='flex items-center gap-3 w-full px-4 py-2 cursor-pointer text-left'
    whileHover={{ scale: 1.1 }}
    onClick={() => onClick()}>
    <Icon size={24} /> {label}
  </motion.button>
)

interface CartBtnProps {
  router: AppRouterInstance
  count: number
}

export const CartBtn = ({ router, count }: CartBtnProps) => (
  <motion.button
    className='relative'
    whileHover={{ scale: 1.1 }}
    onClick={() => router.push('/cart')}>
    <AiOutlineShoppingCart size={24} />
    {count > 0 && (
      <span className='absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1'>
        {count}
      </span>
    )}
  </motion.button>
)


interface SidebarBtnProps {
  label: string
  path: string
  router: ReturnType<typeof useRouter>
  Icon: IconType
  setSidebarOpen: (value: boolean) => void
}

const SidebarBtn = ({ label, path, router, Icon, setSidebarOpen }: SidebarBtnProps) => (
  <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left' onClick={()=>{router.push(path);setSidebarOpen(false)}}>
    <Icon size={24} /> {label}
  </button>
)

interface SidebarBtnForSignOutProps {
  label: string
  Icon: IconType
  setSidebarOpen: (value: boolean) => void
}

const SidebarBtnForSignOut = ({ label, Icon, setSidebarOpen }: SidebarBtnForSignOutProps) => (
  <button className='flex items-center gap-3 px-4 py-2 rounded-lg bg-[#6a69693c] hover:bg-white/10 text-left' onClick={()=>{signOut();setSidebarOpen(false)}}>
    <Icon size={24} /> {label}
  </button>
)
