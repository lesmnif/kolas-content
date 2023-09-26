import { Tabs } from "@radix-ui/react-tabs"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { toast } from "react-hot-toast"
import TabsPage from "./Tabs"

const tabs = [
  { name: "Upload Image", href: "image", current: true },
  { name: "Upload Video", href: "video", current: false },
]

export default function UploadPageAdmin({ supabase, session }) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const [selectedStore, setSelectedStore] = useState(null)
  const [selectedTab, setSelectedTab] = useState(tabs[0].name)
  const [duration, setDuration] = useState("")
  const [startDate, setStartDate] = useState(getCurrentDate())
  const [finishDate, setFinishDate] = useState(getNextDay())

  function getCurrentDate() {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Helper function to get the next day's date in YYYY-MM-DD format
  function getNextDay() {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 1)
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  console.log("whatsupppp", selectedStore)

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName)
    fileInputRef.current.value = null // Clear the file input value
  }

  const uploadImages = async (files) => {
    if (!selectedStore) {
      return toast.error("You must select a store")
    }
    console.log("dafuc", fileInputRef.current.value)
    if (fileInputRef.current.value === "") {
      return toast.error("You must upload at least one file")
    }
    const parsedStartDate = new Date(startDate)
    const parsedFinishDate = new Date(finishDate)

    // Check if finish date is earlier than start date
    if (parsedFinishDate < parsedStartDate) {
      toast.error("Finish date cannot be earlier than the start date.")
      return
    }

    if (!duration) {
      toast.error("You must set a duration time")
      return
    }
    // Set uploading to true to disable the button
    setUploading(true)
    const loadingToast = toast.loading("Loading...", {
      iconTheme: {
        primary: "#fff",
        secondary: "#000",
      },
    })

    try {
      const fileType =
        selectedTab === "Upload Image" ? "images" : "videos" || "images"
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file) {
          toast.error("No file selected.")
          continue // Skip to the next file
        }
        const number = i + 1

        const { data, error } = await supabase.storage
          .from(fileType)
          .upload(`${selectedStore}/${file.name}`, file)

        if (error) {
          toast.error(
            `Error uploading ${fileType.slice(0, -1)} "${file.name}" : ${
              error.message
            }`
          )
        } else if (files.length === 1) {
          toast.remove()
          toast.success(
            `${
              fileType === "images" ? "Image" : "Video"
            } uploaded successfully`,
            {
              className: "text-center",
            }
          )
        } else if (files.length > 1) {
          // Display individual success toasts for multiple files
          toast.success(
            `${
              fileType === "images" ? "Image" : "Video"
            } ${number} uploaded successfully`,
            {
              className: "text-center",
            }
          )
        }
      }
      if (files.length > 1) {
        toast.success(
          `Finished uploading the ${
            fileType === "images" ? "images" : "videos"
          } `,
          {
            className: "text-center",
          }
        )
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      toast.remove(loadingToast)
      // Reset the input file value
      fileInputRef.current.value = ""
      // Set uploading back to false to enable the button
      setUploading(false)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const files = fileInputRef.current.files
    uploadImages(files)
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => window.location.replace(location.origin)}
          disabled={uploading} // Disable the button when uploading is true
          className="flex hover:cursor-pointer justify-center px-16 ml-5 text-center rounded-md bg-kolas bg-opacity-90 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          View content
          {/* Show "Uploading..." while uploading */}
        </button>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div
            onClick={() => window.location.replace(location.origin)}
            className="flex hover:cursor-pointer items-center justify-center my-5"
          >
            <img src="/Kolas_Logo.svg" width="100" alt="Kolas" />
          </div>
          <h2 className="mt-3 text-center text-2xl leading-9 tracking-tight text-gray-900 font-semibold ">
            Upload Content
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-6 shadow sm:rounded-lg sm:px-12 border  border-slate-200">
            <TabsPage
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              handleTabClick={handleTabClick}
              tabs={tabs}
            />

            <div className="mt-6 text-center"></div>

            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={(event) => onSubmit(event)}
            >
              <div className="">
                {/* <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label> */}
                <div className="mt-2">
                  <label
                    htmlFor="stores"
                    className="block mb-2 text-sm font-medium text-gray-900 text-center dark:text-white"
                  >
                    Select the store you want to upload your content to
                  </label>
                  <select
                    id="stores"
                    className="bg-gray-100 text-center border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  {/* <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  /> */}
                </div>
              </div>
              <div className="mt-2">
                <label
                  htmlFor="duration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Duration (in seconds)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="bg-gray-100 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter duration"
                />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="startDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                  className="bg-gray-100 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select start date"
                />
              </div>

              <div className="mt-2">
                <label
                  htmlFor="finishDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Finish Date
                </label>
                <input
                  type="date"
                  id="finishDate"
                  name="finishDate"
                  value={finishDate}
                  onChange={(event) => setFinishDate(event.target.value)}
                  className="bg-gray-100 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select finish date"
                />
              </div>
              <div className="flex">
                <input
                  ref={fileInputRef}
                  className="block w-full text-sm font-bold text-gray-900 border border-gray-100  rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  id="fileInput"
                  accept={
                    selectedTab === "Upload Image"
                      ? ".png, .jpg, .jpeg"
                      : ".mp4, .avi, .mov, .mkv"
                  }
                  multiple // Allow multiple file selection
                />
              </div>
              <button
                type="submit"
                disabled={uploading} // Disable the button when uploading is true
                className={
                  uploading
                    ? "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                    : "flex w-full hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                }
              >
                {uploading ? "Uploading..." : "Upload"}{" "}
                {/* Show "Uploading..." while uploading */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
