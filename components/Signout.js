"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  if (session) {
    return <>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }
  return <>
    <a
      href="/Auth"
      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
    >
      Sign in
    </a>
  </>
}