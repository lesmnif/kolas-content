import { useState, useEffect } from "react"
import UnsplashImages from "./UnsplashImages"
import toast from "react-hot-toast"

export default function ChooseContent({
  supabase,

  vibeName,
  coverImages,
}) {
  const [selected, setSelected] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [images, setImages] = useState([])

  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/images/"

  const fetchImages = async () => {
    try {
      toast.loading()
      setImages([])
      const { data, error } = await supabase.storage
        .from("images")
        .list(`${selectedStore}/`, {
          limit: 10,
          sortBy: {
            column: "name",
            order: "asc",
          },
        })
      console.log("this is ym data", data)

      if (data) {
        console.log("this is ym data", data)
        setImages(data)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.remove()
      toast.success(`Content for ${selectedStore} retrieved`)
    }
  }

  useEffect(() => {
    if (selectedStore === null) {
      return
    }
    fetchImages()
  }, [selectedStore])

  console.log("images and store", images, selectedStore)

  console.log("selected", selected)

  return (
    <div className="flex items-start sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
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
                  Select the store you want to upload your content to
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(event) => setSelectedStore(event.target.value)}
                  value={selectedStore || ""}
                >
                  {selectedStore === null && (
                    <option value="">Choose a store...</option>
                  )}
                  <option value="Kolas Blumenfeld">Kolas Blumenfeld</option>
                  <option value="Kolas Main Ave">Kolas Main Ave</option>
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
              {/* <p className="text-black text-center my-2 mb-3 border-t border-spacing-y-10 border-white font-bold capitalize">
                {selectedStore}
              </p> */}
              {images.length !== 0 && (
                <h1 className="block text-base mt-5 text-black font-semibold mb-6 text-center ">
                  Choose Your Content
                </h1>
              )}
              <UnsplashImages
                Cdn_URL={Cdn_URL}
                selectedStore={selectedStore}
                images={images}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
          {images.length !== 0 && (
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                className="flex w-full hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Reproduction
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
