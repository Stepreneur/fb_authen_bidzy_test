'use client'
import FacebookBtn from "@/components/FacebookBtn/page"
import UserProfile from "@/components/UserProfile/page"
import { useSession } from "next-auth/react"

export default function HomePage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Facebook Authentication Demo
        </h1>
        
        {status === "loading" ? (
          <div className="text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : session ? (
          <UserProfile />
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please sign in to continue</p>
            <FacebookBtn />
          </div>
        )}
      </div>
    </div>
  )
}
