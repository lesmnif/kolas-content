import React, { useState, useEffect, useRef } from "react"
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import ReactPlayer from "react-player"

export default function Slider({
  images,
  selectedStore,
  selected,
  setSelected,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentDuration, setCurrentDuration] = useState(
    images[currentIndex]?.duration
  )
  const [isPlaying, setIsPlaying] = useState(
    new Array(images.length).fill(false)
  )
  const [isVideo, setIsVideo] = useState(false)
  // Function to toggle the playing state of a specific video
  const togglePlaying = (index) => {
    const newIsPlaying = [...isPlaying]
    newIsPlaying[index] = !newIsPlaying[index]
    setIsPlaying(newIsPlaying)
  }

  console.log("those are my images", images)

  const handleChange = () => {
    if (isVideo) {
      setIsVideo(false)
      return
    }
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0)
      setCurrentDuration(images[0].duration)
    } else {
      setCurrentDuration(images[currentIndex + 1].duration)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    if (images[currentIndex]?.isVideo) {
      togglePlaying(currentIndex)
    }

    // Check if the current index corresponds to a video and play it
    if (images[currentIndex + 1]?.isVideo) {
      togglePlaying(currentIndex + 1)
    }
  }

  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/images/"

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

  return (
    <div className="w-full h-screen">
      <Zoom {...zoomInProperties} pauseOnHover={false}>
        {images.map((image, index) => (
          <div
            key={index}
            className="flex justify-center md:items-center items-start w-screen h-screen relative"
          >
            {image.isVideo ? (
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
                url={index === currentIndex + 1 ? "" : `/images${image.url}`}
              />
            ) : (
              <img
                className="w-screen h-screen"
                src={`${Cdn_URL}${selectedStore}/${image.name}`}
              />
            )}
          </div>
        ))}
      </Zoom>
    </div>
  )
}
