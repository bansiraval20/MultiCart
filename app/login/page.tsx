"use client"

import { AnimatePresence, motion } from 'framer-motion'
import { CircleArrowRight, Eye, EyeOff } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { ClipLoader } from 'react-spinners'

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const session = useSession()
    console.log(session.data?.user)

    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true)
      try {
        const result = await signIn('credentials', {
          email, password, redirect: false
        })

        alert('Login successful!')
        router.push("/")
        setLoading(false)

      } catch (error) {
        console.log(error)
        setLoading(false)
        alert('Login failed. Please check your credentials and try again.')
      }
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6'>
      <AnimatePresence>
      <motion.div
            className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}>
            <h1 className='text-2xl font-semibold text-center mb-6 text-gray-100'>
              Welcome Back to <span className='text-blue-400'>MultiCart</span>
            </h1>
            <form onSubmit={handleSignIn} className='flex flex-col gap-4'>
              <input
                type='email'
                required
                placeholder='Email'
                className='bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder='Password'
                className='relative bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-12 top-45 -translate-y-1/2 text-gray-400 hover:text-white transition'>
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <motion.button
                type='submit'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className='mt-5 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300'>
                {loading ? (
                  <ClipLoader size={20} />
                ) : (
                  <>
                    <span>Login</span>
                    <CircleArrowRight size={20} />
                  </>
                )}
              </motion.button>

              <div className='flex items-center my-3'>
                <div className='flex-1 h-px bg-gray-600'></div>
                <span className='px-3 text-sm text-gray-400'>or</span>
                <div className='flex-1 h-px bg-gray-600'></div>
              </div>

              <motion.button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                type='submit'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className='flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-whit/30 rounded-xl transition'>
                <FcGoogle className='w-5 h-5' size={20} />
                <span className='font-medium'>Login with Google</span>
              </motion.button>
              <p className='text-center text-sm mt-4 text-gray-400'>
                Don&apos;t Have an account?{'  '}
                <span
                  onClick={() => router.push('/register')}
                  className='text-blue-400 hover:underline hover:text-blue-300 transition cursor-pointer'>
                  Sign Up
                </span>
              </p>
            </form>
          </motion.div>
        )
      </AnimatePresence>
    </div>
  )
}

export default SignIn
