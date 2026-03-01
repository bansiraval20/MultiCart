import { auth } from '@/auth'
import EditRoleandPhone from '@/components/EditRoleandPhone'
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
  const inComplete = !user.role || !user.phone || (!user.phone && user.role == "user")
  if(inComplete) {
    return <EditRoleandPhone />
  }
  return <div>Home</div>
}
