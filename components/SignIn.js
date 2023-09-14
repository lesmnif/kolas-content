import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

export default function SignIn({ supabaseClient }) {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState(null)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      })
      console.log("hi", data, error)
      if (error) throw error
      else {
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      // window.location.replace(location.origin)
      // window.location(location.origin)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <div className="flex items-center justify-center y-5">
            <img src="/Kolas_Logo.svg" width="100" alt="Kolas" />
          </div>
          <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900 font-normal ">
            Log in your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12 border  border-slate-200">
            <div className="mt-6 text-center"></div>
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(event) => onSubmit(event)}
            >
              <div className="">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className=" ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 peer-invalid:visible"
                >
                  Password
                </label>
                <div className="mt-2">
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={isVisible ? "text" : "password"}
                      autoComplete="false"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <span
                      onClick={() => setIsVisible(!isVisible)}
                      className="absolute inset-y-0 right-0 flex items-center pr-2 hover:cursor-pointer"
                    >
                      {isVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 text-gray-700 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between"></div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center hover:cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
