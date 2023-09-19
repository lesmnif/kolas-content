import React, { useState, useEffect, useRef } from "react"
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid"
// import supabase from "../utils/supabase";
import { toast } from "react-hot-toast"
import Image from "next/image"
import * as AspectRatio from "@radix-ui/react-aspect-ratio"
import ReactPlayer from "react-player"

const testingImages = [
  { url: "0", duration: 5000 },
  { url: "1", duration: 3000 },
  { url: "/kolas_video.mp4", duration: 161000, isVideo: true },
  { url: "2", duration: 1000 },
  { url: "3", duration: 1000 },
  { url: "4", duration: 3000 },
  { url: "5", duration: 10000 },
  { url: "6", duration: 10000 },
  { url: "7", duration: 1000 },
  // { url: "8", duration: 1000 },
  { url: "/blockchain.mp4", duration: 9999999, isVideo: true },
  // Add more images with their respective durations
]

const Slideshow = ({ supabase }) => {
  const [images, setImages] = useState([])
  const [photoUrl, setPhotoUrl] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentDuration, setCurrentDuration] = useState(
    testingImages[currentIndex]?.duration
  )
  const [isPlaying, setIsPlaying] = useState(
    new Array(testingImages.length).fill(false)
  )
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(false)
  const [isVideo, setIsVideo] = useState(false)
  // Function to toggle the playing state of a specific video
  const togglePlaying = (index) => {
    const newIsPlaying = [...isPlaying]
    newIsPlaying[index] = !newIsPlaying[index]
    setIsPlaying(newIsPlaying)
  }

  const handleChange = () => {
    if (isVideo) {
      setIsVideo(false)
      return
    }
    if (currentIndex === 9) {
      setCurrentIndex(0)
      setCurrentDuration(testingImages[0].duration)
    } else {
      setCurrentDuration(testingImages[currentIndex + 1].duration)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    if (testingImages[currentIndex]?.isVideo) {
      togglePlaying(currentIndex)
    }

    // Check if the current index corresponds to a video and play it
    if (testingImages[currentIndex + 1]?.isVideo) {
      togglePlaying(currentIndex + 1)
    }
  }

  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/images/"

  // const fetchAvatar = async () => {
  //   const { data, error } = await supabase.storage
  //     .from("images")
  //     .list("kolas-arden/", {
  //       limit: 10,
  //       sortBy: {
  //         column: "name",
  //         order: "asc",
  //       },
  //     })
  //   console.log("dafuc homie", data)
  //   if (data) {
  //     setImages(data)
  //   }
  // }

  // useEffect(() => {
  //   fetchAvatar()
  // }, [])

  //Array of Images

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    scale: 1,
    duration: currentDuration,
    transitionDuration: 250,
    onChange: () => handleChange(),
    infinite: true,
    // prevArrow: (
    //   <div className="ml-10 top-40 md:top-72">
    //     <ArrowLeftIcon className="h-8 w-8 text-black cursor-pointer" />
    //   </div>
    // ),
    nextArrow: (
      <div className="mr-10 top-40 md:top-72">
        <ArrowRightIcon className="h-8 w-8 text-black cursor-pointer" />
      </div>
    ),
  }

  // const getPhoto = async () => {
  //   try {
  //     const photoUrl = await supabase.storage
  //       .from("images")
  //       .getPublicUrl("Kolas Arden/image1.png")

  //     setPhotoUrl(photoUrl.data.publicUrl)

  //     console.log("this is my photoUrl", photoUrl)

  //     // setPhotoUrl(photoUrl.data.publicUrl)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getPhoto()
  // }, [])

  // const updatePhoto = async () => {
  //   const fileInput = document.getElementById("fileInput")
  //   const file = fileInput.files[0]

  //   if (!file) {
  //     console.error("No file selected.")
  //     return
  //   }

  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("images")
  //       .upload("kolas-arden/image5.png", file)

  //     if (error) {
  //       toast.error("Error uploading image:", error)
  //     } else {
  //       toast.success("Image uploaded successfully")
  //     }
  //   } catch (error) {
  //     toast.error("Error uploading image:", error)
  //   }
  // }

  return (
    <div className="w-full h-screen">
      {/* <div onClick={getPhoto}>XDDDDDDDDDDDDDDD</div>
      <input type="file" id="fileInput" accept=".png, .jpg, .jpeg" /> */}
      {/* <img src={photoUrl} /> */}
      {!isCarouselPlaying ? (
        <div className="flex items-center h-screen text-center justify-center">
          <button
            className=" w-1/4 items-center hover:cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setIsCarouselPlaying(true)}
          >
            Start playing
          </button>
        </div>
      ) : (
        <Zoom {...zoomInProperties} pauseOnHover={false}>
          {testingImages.map((each, index) => (
            <div
              key={index}
              className="flex justify-center md:items-center items-start w-screen h-screen relative"
            >
              {each.isVideo ? (
                <ReactPlayer
                  className="w-screen h-screen"
                  playing={isPlaying[index]}
                  onEnded={() => {
                    setIsVideo(true)
                    handleChange()
                  }}
                  // Use the playing state for this video
                  width={"100%"}
                  height={"100%"}
                  url={index === currentIndex + 1 ? "" : `/images${each.url}`}
                />
              ) : (
                <img
                  className="w-screen h-screen"
                  src={`/images/p1hafe27a1s2trie1j5cdkvc9n4-${each.url}.png`}
                />
              )}
            </div>
          ))}
        </Zoom>
      )}
    </div>
  )
}

export default Slideshow
