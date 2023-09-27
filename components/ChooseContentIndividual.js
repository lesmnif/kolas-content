import { useState, useEffect } from "react"
import UnsplashImages from "./UnsplashImages"
import toast from "react-hot-toast"
import Slider from "./Slider"
import ModalSignOut from "./ModalSignOut"

export default function ChooseContentIndividual({
  supabase,
  selected,
  setSelected,
  selectedStore,
  setSelectedStore,
  session,
  userEmail,
  images: supabaseData,
  setImages: setSupabaseData,
}) {
  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/"

  console.log("this is my session", session)

  const [showSlideShow, setShowSlideShow] = useState(false)
  const [open, setOpen] = useState(false)
  // Function to handle "Start Reproduction" button click
  const handleStartReproduction = () => {
    setShowSlideShow(true)
  }

  const handleClick = async () => {
    supabase.auth.signOut()
  }

  console.log("tis is my selected store", selectedStore)

  useEffect(() => {
    console.log(
      "tis is my selected store inside selectefSto inside the useeffect",
      selectedStore
    )

    const currentDate = new Date() // Get the current date and time
    const currentDateStr = currentDate.toISOString().split("T")[0]

    const fetchSupabaseData = async () => {
      try {
        console.log(currentDateStr)
        toast.loading("Loading...")
        setSupabaseData([])
        const { data, error } = await supabase
          .from("bucket_data")
          .select()
          .eq("store", selectedStore)
          .order("created_at", { ascending: false })
          .filter("start_date", "lte", currentDateStr) // Only items with startDate in the past or present
          .filter("finish_date", "gte", currentDateStr) // Only items with finishDate in the future or present

        if (data) {
          setSupabaseData(data)
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        toast.remove()
        toast.success(`Content for ${selectedStore} retrieved`, {
          className: "text-center",
        })
      }
    }

    if (selectedStore === null || supabaseData.length !== 0) {
      return
    }

    fetchSupabaseData()
  }, [])

  console.log("this is my supabasedata", supabaseData)

  return (
    <div>
      {showSlideShow ? (
        <Slider images={selected} selectedStore={selectedStore} />
      ) : (
        <div>
          <p className="flex items-end hover:cursor-pointer justify-end py-4 mr-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded bg-white px-2 py-1 border border-kolas text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex justify-end"
            >
              Log out
            </button>
          </p>
          <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <ModalSignOut
              open={open}
              setOpen={setOpen}
              handleClick={handleClick}
            />
            <div className="px-4 pt-5 pb-4 text-left w-6/12 h-auto">
              <div>
                <div>
                  <div className="text-center">
                    <p className=" font-medium">
                      You&apos;re currently visualizing content in
                    </p>
                    <div className="mt-2">
                      <div
                        id="stores"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={selectedStore}
                      >
                        {userEmail === "kolas@blumenfeld.com" && (
                          <option value="Kolas Blumenfeld">
                            Kolas Blumenfeld
                          </option>
                        )}
                        {userEmail === "kolas@mainave.com" && (
                          <option value="Kolas Main Ave">Kolas Main Ave</option>
                        )}
                        {userEmail === "kolas@fruitridge66.com" && (
                          <option value="Kolas Fruitridge - 66">
                            Kolas Fruitridge - 66
                          </option>
                        )}
                        {userEmail === "kolas@florin.com" && (
                          <option value="Kolas Florin Perkins">
                            Kolas Florin Perkins
                          </option>
                        )}
                        {userEmail === "kolas@fruitridgesouth.com" && (
                          <option value="Kolas Fruitridge - South Watt">
                            Kolas Fruitridge - South Watt
                          </option>
                        )}
                        {userEmail === "kolas@arden.com" && (
                          <option value="Kolas Arden">Kolas Arden</option>
                        )}
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 pt-4 pr-4 sm:block ">
                      <button
                        type="button"
                        className="rounded-md bg-vibez-cards focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close</span>
                      </button>
                    </div>

                    <p className=" font-medium  text-center mt-5">
                      You can also{" "}
                      <button
                        type="button"
                        onClick={() => window.location.replace("/upload")}
                        className="rounded bg-gray-100 inline-flex px-3 py-1.5 hover:cursor-pointer border border-kolas text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 justify-end"
                      >
                        Upload
                      </button>{" "}
                      more content in that store
                    </p>

                    {supabaseData.length !== 0 && (
                      <h1 className="block text-base mt-5 text-black font-semibold mb-6 text-center ">
                        Choose Your Content
                      </h1>
                    )}

                    <UnsplashImages
                      Cdn_URL={Cdn_URL}
                      selectedStore={selectedStore}
                      images={supabaseData}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </div>
                </div>
                {supabaseData.length !== 0 && (
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      onClick={() => handleStartReproduction()}
                      className="flex w-full hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Reproduction
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
