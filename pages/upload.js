import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Slideshow from "../components/SlideShow"
import UploadPage from "../components/Upload"

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
      <button onClick={() => supabase.auth.signOut()}>XD</button>
      <div>
        {isLoading ? (
          <div>this is the loader</div>
        ) : !session ? (
          <SignIn supabaseClient={supabase} />
        ) : (
          <UploadPage supabase={supabase} />
        )}
      </div>
    </div>
  )
}
