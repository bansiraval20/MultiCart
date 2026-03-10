import { auth } from '@/auth'
import EditRoleandPhone from '@/components/EditRoleandPhone'
import Navbar from '@/components/Navbar'
import connectDb from '@/lib/connectDB'
import User from '@/model/user.model'
import { redirect } from 'next/navigation'

export default async function Home() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect('/login')
  }
  const inComplete =
    !user.role || !user.phone || (!user.phone && user.role == 'user')
  if (inComplete) {
    return <EditRoleandPhone />
  }

  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-black to-gray-900 text-white px-6 font-sans'>
      <Navbar user={plainUser}/>
    </div>
  )
}
