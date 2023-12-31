import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Slideshow from "../components/PreSlider"
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

  return (
    <div>
      <div>
        {isLoading ? (
          <Loader />
        ) : !session ? (
          <SignIn supabaseClient={supabase} />
        ) : (
          <Slideshow supabase={supabase} session={session} />
        )}
      </div>
    </div>
  )
}
