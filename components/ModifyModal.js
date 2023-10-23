import { Fragment, useRef, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/24/outline"

export default function ModifyModal({
  open,
  setOpen,
  Cdn_URL,
  image,
  newStartDate,
  newFinishDate,
  setNewStartDate,
  setNewFinishDate,
  newDuration,
  setNewDuration,
  handleDateUpdate,
  uploadingDate,
  uploadingDuration,
  handleDurationUpdate,
  handleDelete,
}) {
  const cancelButtonRef = useRef(null)

  function getLastPartOfPath(path) {
    const parts = path.split("/")
    if (parts.length > 0) {
      return parts[parts.length - 1]
    } else {
      // If the input is empty or doesn't contain '/', return an empty string or handle it as needed.
      return ""
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-44 mt-5  items-center justify-center rounded-full bg-green-100">
                    <div className="group aspect-w-10 aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 ring-1 ring-kolas ring-opacity-60 ring-offset-2 rign-offset-gray-100">
                      <picture>
                        <img
                          src={`${Cdn_URL}${image.src}`}
                          alt="image"
                          className="object-cover pointer-events-none w-full h-24"
                        />
                      </picture>
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 mt-8 text-gray-900"
                    >
                      {image ? getLastPartOfPath(image.src) : ""}
                    </Dialog.Title>
                    <div>
                      <div className="mt-2 flex">
                        <div className="mt-2 ">
                          <label
                            htmlFor="startDate"
                            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Start Date
                          </label>
                          <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={newStartDate}
                            onChange={(event) =>
                              setNewStartDate(event.target.value)
                            }
                            className="bg-gray-100 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select start date"
                          />
                        </div>

                        <div className="mt-2 mx-2">
                          <label
                            htmlFor="finishDate"
                            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Finish Date
                          </label>
                          <input
                            type="date"
                            id="finishDate"
                            name="finishDate"
                            value={newFinishDate}
                            onChange={(event) =>
                              setNewFinishDate(event.target.value)
                            }
                            className="bg-gray-100 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Select finish date"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="submit"
                            onClick={() => handleDateUpdate()}
                            disabled={uploadingDate} // Disable the button when uploading is true
                            className={
                              uploadingDate
                                ? "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                                : "flex w-full hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            }
                          >
                            {uploadingDate ? "Updating..." : "Update"}{" "}
                            {/* Show "Uploading..." while uploading */}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="duration"
                          className="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Duration (in seconds)
                        </label>
                        <div className="mt-2 flex">
                          <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={newDuration}
                            onChange={(event) =>
                              setNewDuration(event.target.value)
                            }
                            className="bg-gray-100 border hover:cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter duration"
                          />{" "}
                          <div className="flex items-end">
                            <button
                              type="submit"
                              disabled={uploadingDuration} // Disable the button when uploading is true
                              onClick={() => handleDurationUpdate()}
                              className={
                                uploadingDuration
                                  ? "flex w-full ml-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
                                  : "flex w-full ml-2 hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              }
                            >
                              {uploadingDuration ? "Updating..." : "Update"}{" "}
                              {/* Show "Uploading..." while uploading */}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 items-center justify-center sm:mt-6">
                  {/* <button
                    type="button"
                    className="inline-flex  w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                    onClick={() => setOpen(false)}
                  >
                    Deactivate
                  </button> */}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full bg-red-600 hover:cursor-pointer font-semibold justify-center rounded-md py-2 text-sm text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-500 sm:col-start-1 sm:mt-0"
                    onClick={() => handleDelete()}
                    ref={cancelButtonRef}
                  >
                    Delete content
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
