'use client'

import axios from 'axios'
import {
  CircleArrowRight,
  CircleUserRound,
  Eye,
  EyeOff,
  User2,
  Warehouse,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { ClipLoader } from 'react-spinners'

const Register = () => {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const accountTypes = [
    { label: 'User', Icon: User2, value: 'User' },
    { label: 'Vendor', Icon: Warehouse, value: 'Vendor' },
    { label: 'Admin', Icon: CircleUserRound, value: 'Admin' },
  ]

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      })
      console.log(result.data)
      setLoading(false)
      setEmail('')
      setName('')
      setPassword('')
      router.push('/login')
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6'>
      <AnimatePresence mode='wait'>
        {step === 1 && (
          <motion.div
            key='step1'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-12 text-center'>
            {/* Header */}
            <div className='space-y-3 mb-10'>
              <h1 className='text-4xl font-bold tracking-tight bg-blue-400 bg-clip-text text-transparent'>
                Welcome to MultiCart
              </h1>
              <p className='text-gray-400 text-sm tracking-wide'>
                Register with one of the following account types
              </p>
            </div>

            {/* Account Options */}
            <div className='grid grid-cols-3 gap-6'>
              {accountTypes.map(({ Icon, label, value }) => (
                <motion.div
                  key={value}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className='group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all duration-300'>
                  <div className='p-3 rounded-full bg-white/10 group-hover:bg-blue-500/20 transition-all duration-300'>
                    <Icon size={30} className='text-blue-400' />
                  </div>

                  <span className='text-sm font-medium tracking-wide text-gray-300 group-hover:text-white'>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Button */}
            <motion.button
              onClick={() => setStep(2)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='mt-10 w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300'>
              <span>Next</span>
              <CircleArrowRight size={20} />
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}>
            <h1 className='text-2xl font-semibold text-center mb-6 text-blue-300'>
              Create your Account
            </h1>
            <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
              <input
                type='text'
                required
                placeholder='Full Name'
                className='bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
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
                className='absolute right-12 top-61.5 -translate-y-1/2 text-gray-400 hover:text-white transition'>
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
                    <span>Register Now</span>
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
                <span className='font-medium'>Continue with Google</span>
              </motion.button>
              <p className='text-center text-sm mt-4 text-gray-400'>
                Already have an account?{'  '}
                <span
                  onClick={() => router.push('/login')}
                  className='text-blue-400 hover:underline hover:text-blue-300 transition cursor-pointer'>
                  signIn
                </span>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Register
