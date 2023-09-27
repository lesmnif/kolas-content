import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

import { Carousel } from "react-responsive-carousel"
import Loader from "../components/Loader"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(true)

  const [session, setSession] = useState(null || Object)
  const supabase = useSupabaseClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false)
    })
    return () => subscription.unsubscribe()
  }, [])

  const testingImages = [
    { url: "0", duration: 5000 },
    { url: "1", duration: 3000 },
    { url: "/kolas_video.mp4", duration: 5000, isVideo: true },
    { url: "2", duration: 1000 },
    { url: "3", duration: 1000 },
    { url: "4", duration: 3000 },
    { url: "5", duration: 10000 },
    { url: "6", duration: 10000 },
    { url: "7", duration: 1000 },
    // { url: "8", duration: 1000 },
    { url: "/blockchain.mp4", duration: 24000, isVideo: true },
    // Add more images with their respective durations
  ]

  return <Loader />
}
