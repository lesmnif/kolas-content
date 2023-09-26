import { useState, useEffect } from "react"
import UnsplashImages from "./UnsplashImages"
import toast from "react-hot-toast"
import Slider from "./Slider"
import ModalSignOut from "./ModalSignOut"

export default function ChooseContentAdmin({
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
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/images/"

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

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        toast.loading("Loading...")
        setSupabaseData([])
        const { data: imageData, error: imageError } = await supabase.storage
          .from("images")
          .list(`${selectedStore}/`, {
            limit: 25,
            sortBy: {
              column: "name",
              order: "asc",
            },
          })

        const { data: videoData, error: videoError } = await supabase.storage
          .from("videos")
          .list(`${selectedStore}/`, {
            limit: 25,
            sortBy: {
              column: "name",
              order: "asc",
            },
          })

        if (imageData) {
          // Add the duration prop to each image in the imageData array
          const imagesWithDuration = imageData.map((image) => ({
            ...image,
            type: "image", // Add a type property to indicate it's an image
            duration: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          }))
          setSupabaseData((prevData) => [...prevData, ...imagesWithDuration])
        }

        if (videoData) {
          // Add the duration prop to each video in the videoData array
          const videosWithDuration = videoData.map((video) => ({
            ...video,
            type: "video", // Add a type property to indicate it's a video
            duration: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          }))
          setSupabaseData((prevData) => [...prevData, ...videosWithDuration])
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

    if (selectedStore === null) {
      return
    }

    fetchSupabaseData()
  }, [selectedStore, supabase, setSupabaseData])

  console.log("images and store", supabaseData, selectedStore)

  console.log("selected", selected)

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
                    <p className=" font-medium">Which store are you in?</p>
                    <div className="mt-2">
                      <label
                        htmlFor="stores"
                        className="block mb-3 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select the store you want to visualize your content from
                      </label>
                      <select
                        id="stores"
                        className="bg-gray-50 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) =>
                          setSelectedStore(event.target.value)
                        }
                        value={selectedStore || ""}
                      >
                        {selectedStore === null && (
                          <option value="">Choose a store...</option>
                        )}
                        {userEmail === "kolas@admin.com" && (
                          <>
                            <option value="Kolas Blumenfeld">
                              Kolas Blumenfeld
                            </option>
                            <option value="Kolas Main Ave">
                              Kolas Main Ave
                            </option>
                            <option value="Kolas Fruitridge - 66">
                              Kolas Fruitridge - 66
                            </option>
                            <option value="Kolas Florin Perkins">
                              Kolas Florin Perkins
                            </option>
                            <option value="Kolas Fruitridge - South Watt">
                              Kolas Fruitridge - South Watt
                            </option>
                            <option value="Kolas Arden">Kolas Arden</option>
                          </>
                        )}
                      </select>
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
                      Or else{" "}
                      <button
                        type="button"
                        onClick={() => window.location.replace("/upload")}
                        className="rounded bg-gray-100 inline-flex px-3 py-1.5 hover:cursor-pointer border border-kolas text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 justify-end"
                      >
                        Upload
                      </button>{" "}
                      more content
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
