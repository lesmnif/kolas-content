import "../styles/globals.css"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import {
  SessionContextProvider,
  useSupabaseClient,
} from "@supabase/auth-helpers-react"
import { useState } from "react"
import { Toaster } from "react-hot-toast"


function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createPagesBrowserClient())

  return (
    <div className="bg-white min-h-screen">
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Toaster/>
        <Component {...pageProps} />
      </SessionContextProvider>
    </div>
  )
}

export default MyApp
