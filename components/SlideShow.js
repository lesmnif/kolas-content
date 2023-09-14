import React, { useState, useEffect } from "react"
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
// import supabase from "../utils/supabase";
import { toast } from "react-hot-toast"
import Image from "next/image"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"

const Slideshow = ({ supabase }) => {
  const [images, setImages] = useState([])
  const [photoUrl, setPhotoUrl] = useState("")
  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/images/"

  const fetchAvatar = async () => {
    const { data, error } = await supabase.storage
      .from("images")
      .list("kolas-arden/", {
        limit: 10,
        sortBy: {
          column: "name",
          order: "asc",
        },
      })
    if (data) {
      setImages(data)
      // make a list of Promises that will download the blob using the name we got
      //   const downloads = data.map(({ name }) =>
      //     supabase.storage.from("images").download(`kolas-arden/${name}`, {
      //       transform: {
      //         resize: "contain",
      //       },
      //     })
      //   )
      //   // use Promise.all to download all the blobs in the list, concurrently
      //   const blobs = await Promise.all(downloads)

      //   // use map to tranform the blobs into URLs
      //   const urls = blobs.map(({ data }) => URL.createObjectURL(data))
    }
  }

  useEffect(() => {
    fetchAvatar()
  }, [])

  //Array of Images

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    scale: 1,
    duration: 1000,
    transitionDuration: 250,
    infinite: true,
    prevArrow: (
      <div className="ml-10 top-40 md:top-72">
        <ArrowLeftIcon className="h-8 w-8 text-black cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className="mr-10 top-40 md:top-72">
        <ArrowRightIcon className="h-8 w-8 text-black cursor-pointer" />
      </div>
    ),
  }

  const getPhoto = async () => {
    try {
      const photoUrl = await supabase.storage
        .from("images")
        .getPublicUrl("kolas-arden/image1.png")

      setPhotoUrl(photoUrl.data.publicUrl)

      console.log("this is my photoUrl", photoUrl)

      // setPhotoUrl(photoUrl.data.publicUrl)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPhoto()
  }, [])

  const updatePhoto = async () => {
    const fileInput = document.getElementById("fileInput")
    const file = fileInput.files[0]

    if (!file) {
      console.error("No file selected.")
      return
    }

    try {
      const { data, error } = await supabase.storage
        .from("images")
        .upload("kolas-arden/image5.png", file)

      if (error) {
        toast.error("Error uploading image:", error)
      } else {
        toast.success("Image uploaded successfully")
      }
    } catch (error) {
      toast.error("Error uploading image:", error)
    }
  }

  return (
    <div className="w-full h-screen">
      {/* <div onClick={getPhoto}>XDDDDDDDDDDDDDDD</div>
      <input type="file" id="fileInput" accept=".png, .jpg, .jpeg" /> */}
      {/* <img src={photoUrl} /> */}
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className="flex justify-center md:items-center items-start w-screen h-screen relative"
          >
            <img
              className="w-screen"
              src={`${Cdn_URL}kolas-arden/${each.name}`}
            />
            {/* <h1 className="absolute md:top-60 top-24 inset-x-1/4 text-center z-10 md:text-6xl text-4xl bold text-white">
              Hello, Nik
            </h1>
            <p className="absolute md:top-80 top-40 inset-x-1/4 text-center z-10 md:text-2xl text-xl bold text-white">
              Everything you can imagine is real.
            </p> */}
          </div>
        ))}
      </Zoom>
    </div>
  )
}

export default Slideshow
