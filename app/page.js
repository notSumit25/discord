import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import ServerForm from '@/components/ModalForm'
export default function Home() {
  
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <ServerForm />
    </div>
  )
}
