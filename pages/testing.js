import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Slideshow from "../components/SlideShow"
import UploadPage from "../components/Upload"
import ChooseContent from "../components/ChooseContent"

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

  const coverImages = [
    {
      id: 1,
      url: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
    {
      id: 2,
      url: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
    {
      id: 3,
      url: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
  ]

  return (
    <div>
      <button onClick={() => supabase.auth.signOut()}>XD</button>
      <div>
        {isLoading ? (
          <div>this is the loader</div>
        ) : !session ? (
          <SignIn supabaseClient={supabase} />
        ) : (
          <ChooseContent supabase={supabase} coverImages={coverImages} />
        )}
      </div>
    </div>
  )
}
