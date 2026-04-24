import { auth } from '@/auth'
import AdminDashBoard from '@/components/Admin/AdminDashBoard'
import EditRoleandPhone from '@/components/EditRoleandPhone'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import UserDashBoard from '@/components/User/UserDashBoard'
import EditVendorDetails from '@/components/Vendor/EditVendorDetails'
import VendorPage from '@/components/Vendor/VendorPage'
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

  if(user.role === 'vendor') {
    const inCompleteVendor = !user.shopName || !user.shopAddress || !user.gstNumber
    if(inCompleteVendor) {
      return <EditVendorDetails />
    }
  }

  const plainUser = JSON.parse(JSON.stringify(user))
  return (
    <div className='min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white font-sans'>
      <Navbar user={plainUser}/>
      {
        user?.role === 'user' ? <UserDashBoard /> : user?.role === 'vendor' ? <VendorPage user={plainUser}/> : <AdminDashBoard />
      }
      <Footer user={plainUser}/>
    </div>
  )
}
