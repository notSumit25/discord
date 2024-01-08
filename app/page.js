import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
export default function Home() {
  return (
    <div>Home
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}
