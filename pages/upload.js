import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import UploadPageAdmin from "../components/UploadAdmin"
import UploadPage from "../components/Upload"
import Loader from "../components/Loader"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState(null || Object)

  const supabase = useSupabaseClient()

  let selectedStoreValue = "" // Initialize selectedStoreValue variable
  const userEmail = session?.user?.email

  switch (userEmail) {
    case "kolas@blumenfeld.com":
      selectedStoreValue = "Kolas Blumenfeld"
      break
    case "kolas@mainave.com":
      selectedStoreValue = "Kolas Main Ave"
      break
    case "kolas@fruitridge66.com":
      selectedStoreValue = "Kolas Fruitridge - 66"
      break
    case "kolas@florin.com":
      selectedStoreValue = "Kolas Florin Perkins"
      break
    case "kolas@fruitridgesouth.com":
      selectedStoreValue = "Kolas Fruitridge - South Watt"
      break
    case "kolas@arden.com":
      selectedStoreValue = "Kolas Arden"
      break
    default:
      selectedStoreValue = "" // Set a default value or empty string if no match
  }

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
      {/* <button onClick={() => supabase.auth.signOut()}>XD</button> */}
      <div>
        {isLoading ? (
          <Loader />
        ) : !session ? (
          <SignIn supabaseClient={supabase} />
        ) : userEmail === "kolas@admin.com" ? (
          <UploadPageAdmin supabase={supabase} session={session} />
        ) : (
          <UploadPage
            supabase={supabase}
            session={session}
            userEmail={userEmail}
            selectedStoreValue={selectedStoreValue}
          />
        )}
      </div>
    </div>
  )
}
