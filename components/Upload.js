import { Tabs } from "@radix-ui/react-tabs"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { toast } from "react-hot-toast"
import TabsPage from "./Tabs"

const tabs = [
  { name: "Upload Image", href: "image", current: true },
  { name: "Upload Video", href: "video", current: false },
]

export default function UploadPage({ supabase }) {
  const fileInputRef = useRef(null)
  const [uploading, setUploading] = useState(false)

  const [selectedStore, setSelectedStore] = useState(null)
  const [selectedTab, setSelectedTab] = useState(tabs[0].name)

  console.log("whatsupppp", selectedStore)

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName)
    fileInputRef.current.value = null // Clear the file input value
  }

  const uploadImage = async () => {
    if (!selectedStore) {
      return toast.error("You must select a store")
    }

    const fileInput = document.getElementById("fileInput")
    const file = fileInput.files[0]

    if (!file) {
      toast.error("No file selected.")
      return
    }

    // Set uploading to true to disable the button
    setUploading(true)
    toast.loading("Loading...", {
      iconTheme: {
        primary: "#fff",
        secondary: "#000",
      },
    })
    try {
      const fileType =
        selectedTab === "Upload Image" ? "images" : "videos" || "images"

      const { data, error } = await supabase.storage
        .from(fileType)
        .upload(`${selectedStore}/${file.name}`, file)

      if (error) {
        toast.remove()
        toast.error(error.message)
      } else {
        toast.remove()
        toast.success(
          `${fileType === "images" ? "Image" : "Video"} uploaded successfully`
        )
      }
    } catch (error) {
      toast.remove()
      toast.error(error.message)
    } finally {
      // Set uploading back to false to enable the button
      setUploading(false)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    uploadImage()
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex items-center justify-center my-5">
            <img src="/Kolas_Logo.svg" width="100" alt="Kolas" />
          </div>
          <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900 font-semibold ">
            Upload Content
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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

            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}
