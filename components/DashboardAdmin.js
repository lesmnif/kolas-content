import { useState, useEffect } from "react"
import UnsplashImages from "./UnsplashImages"
import toast from "react-hot-toast"
import Slider from "./Slider"
import ModalSignOut from "./ModalSignOut"
import ModifyModal from "./ModifyModal"

export default function Dashboard({
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
  const [openModal, setOpenModal] = useState(false)
  const [currentImage, setCurrentImage] = useState("")
  const [open, setOpen] = useState(false)
  const [newStartDate, setNewStartDate] = useState("")
  const [newFinishDate, setNewFinishDate] = useState("")
  const [newDuration, setNewDuration] = useState("")
  const [uploadingDate, setUploadingDate] = useState(false)
  const [uploadingDuration, setUploadingDuration] = useState(false)

  // Function to handle "Start Reproduction" button click
  const handleStartReproduction = () => {
    if (selected.length === 0) {
      toast.error("You must select at least one image/video")
      return
    }
    setShowSlideShow(true)
  }

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this content")) {
      const { data, error } = await supabase
        .from("bucket_data")
        .delete()
        .eq("id", currentImage.id)

      if (error) {
        toast.error("Error deleting this content", error.message)
      } else {
        const updatedData = supabaseData.filter(
          (item) => item.id !== currentImage.id
        )
        setSupabaseData(updatedData)

        toast.success("Item deleted successfully")
      }
    }
    setOpenModal(false)
    return
  }

  async function updateItem(rowId, updatedData) {
    const { data, error } = await supabase
      .from("bucket_data")
      .update(updatedData)
      .eq("id", rowId)

    if (error) {
      toast.error("Error updating item:", error.message)
    } else {
      // Update the state to reflect the changes in the UI
      const updatedSupabaseData = supabaseData.map((item) => {
        if (item.id === rowId) {
          // Merge the updated data with the existing item
          const updatedItem = { ...item, ...updatedData }

          // Check if 'start_date' exists in the updated data
          if ("start_date" in updatedData) {
            // Convert the 'start_date' to a string
            updatedItem.start_date = new Date(updatedData.start_date)
              .toISOString()
              .split("T")[0]
          }

          // Check if 'finish_date' exists in the updated data
          if ("finish_date" in updatedData) {
            // Convert the 'finish_date' to a string
            updatedItem.finish_date = new Date(updatedData.finish_date)
              .toISOString()
              .split("T")[0]
          }

          return updatedItem
        }
        return item
      })

      console.log("Updated Supabase Data:", updatedSupabaseData)

      setSupabaseData(updatedSupabaseData)

      toast.success("Item updated successfully")
    }
  }

  const handleDurationUpdate = async () => {
    if (!duration) {
      toast.error("You must set a duration time")
      return
    }
    setUploadingDuration(true)
    const updatedData = {
      duration: newDuration,
    }

    await updateItem(currentImage.id, updatedData)

    setUploadingDuration(false)
  }

  const handleDateUpdate = async () => {
    const parsedStartDate = new Date(newStartDate)
    const parsedFinishDate = new Date(newFinishDate)

    // Check if finish date is earlier than start date
    if (parsedFinishDate < parsedStartDate) {
      toast.error("Finish date cannot be earlier than the start date.")
      return
    }
    setUploadingDate(true)

    const updatedData = {
      start_date: parsedStartDate,
      finish_date: parsedFinishDate,
    }

    console.log("those are my params", currentImage.id, updatedData)

    await updateItem(currentImage.id, updatedData)

    setUploadingDate(false)
  }

  const handleModifyClick = async (image) => {
    setNewStartDate(image.start_date)
    setNewFinishDate(image.finish_date)
    setNewDuration(image.duration)
    setCurrentImage(image)
    setOpenModal(true)
  }

  const handleClick = async () => {
    supabase.auth.signOut()
  }

  useEffect(() => {
    console.log(
      "tis is my selected store inside selectefSto inside the useeffect",
      selectedStore
    )

    console.log("this is my selected image", currentImage)

    const currentDate = new Date() // Get the current date and time
    const currentDateStr = currentDate.toISOString().split("T")[0]

    const fetchSupabaseData = async () => {
      try {
        console.log(
          "tis is my selected store inside the fetcher",
          selectedStore
        )
        toast.loading("Loading...")
        setSupabaseData([])
        const { data, error } = await supabase
          .from("bucket_data")
          .select()
          .eq("store", selectedStore)
          .order("created_at", { ascending: true })
          // .filter("start_date", "lte", currentDateStr) // Only items with startDate in the past or present
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

    console.log("am i going here")

    if (selectedStore === null) {
      return
    }

    fetchSupabaseData()
  }, [selectedStore, supabase, setSupabaseData])

  console.log("this is my supabasedata", supabaseData)

  return (
    <div>
      {showSlideShow ? (
        <Slider images={selected} selectedStore={selectedStore} />
      ) : (
        <div>
          <ModifyModal
            handleDelete={handleDelete}
            uploadingDuration={uploadingDuration}
            handleDurationUpdate={handleDurationUpdate}
            uploadingDate={uploadingDate}
            handleDateUpdate={handleDateUpdate}
            open={openModal}
            setOpen={setOpenModal}
            newDuration={newDuration}
            setNewDuration={setNewDuration}
            image={currentImage}
            Cdn_URL={Cdn_URL}
            newStartDate={newStartDate}
            newFinishDate={newFinishDate}
            setNewStartDate={setNewStartDate}
            setNewFinishDate={setNewFinishDate}
          />
          <p className="flex hover:cursor-pointer mt-4 justify-between items-center mb-4 mx-4">
            <button
              type="button"
              onClick={() => (window.location.href = `${location.origin}`)}
              className="rounded bg-white px-2 py-1 border-kolas text-medium font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex justify-end"
            >
              View content
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded bg-white px-2 py-1 border border-kolas text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex justify-end"
            >
              Log out
            </button>
          </p>{" "}
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
                    <p className="font-medium text-2xl text-black mb-10">
                      DASHBOARD
                    </p>
                    <p className=" font-medium text-2xl text-kolas">
                      {supabaseData.length === 0
                        ? "You currently have no content in the following store"
                        : "Click any image to edit or remove content"}
                    </p>
                    <div className="mt-2">
                      <select
                        id="stores"
                        className="bg-gray-50 text-center border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                    {supabaseData.length === 0 ? (
                      <p className=" font-medium  text-center mt-5">
                        <button
                          type="button"
                          onClick={() => window.location.replace("/upload")}
                          className="rounded bg-gray-100 inline-flex px-3 py-1.5 hover:cursor-pointer border border-kolas text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 justify-end"
                        >
                          Upload
                        </button>{" "}
                      </p>
                    ) : (
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
                    )}
                    <div className="mt-10">
                      <UnsplashImages
                        Cdn_URL={Cdn_URL}
                        selectedStore={selectedStore}
                        images={supabaseData}
                        selected={selected}
                        handleClick={handleModifyClick}
                        setSelected={setSelected}
                      />
                    </div>
                  </div>
                </div>
                {/* {supabaseData.length !== 0 && (
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      onClick={() => handleStartReproduction()}
                      className="flex w-full hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Start Reproduction
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
