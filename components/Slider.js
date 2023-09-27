import React, { useState, useEffect } from "react"
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
  const [videoPlayingIndex, setVideoPlayingIndex] = useState(-1)

  // Function to toggle the playing state of a specific video
  const togglePlaying = (index) => {
    const newIsPlaying = [...isPlaying]
    newIsPlaying[index] = !newIsPlaying[index]
    setIsPlaying(newIsPlaying)
  }

  useEffect(() => {
    // Check if the current image's name ends with ".mp4"
    const isCurrentImageVideo = images[currentIndex]?.isVideo

    // Update the videoPlayingIndex when the current image is a video
    if (isCurrentImageVideo) {
      setVideoPlayingIndex(currentIndex)
    }
  }, [currentIndex, images])

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

    // Check if the current index corresponds to a video and play it
    if (videoPlayingIndex === currentIndex) {
      togglePlaying(currentIndex)
    }

    // Check if the next image's name ends with ".mp4" and play it
    const nextIndex = (currentIndex + 1) % images.length
    const isNextImageVideo = images[nextIndex]?.isVideo
    if (isNextImageVideo) {
      togglePlaying(nextIndex)
    }
  }

  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/"

  const zoomInProperties = {
    scale: 1,
    duration: currentDuration * 1000,
    transitionDuration: 250,
    onChange: () => handleChange(),
    infinite: true,
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
                playing={
                  (videoPlayingIndex === currentIndex && currentIndex === 0) ||
                  isPlaying[index]
                }
                onEnded={() => {
                  setIsVideo(true)
                  handleChange()
                }}
                width={"100%"}
                height={"100%"}
                url={index === currentIndex ? `${Cdn_URL}${image.src}` : ""}
              />
            ) : (
              <img
                className="w-screen h-screen"
                src={`${Cdn_URL}${image.src}`}
                alt="image"
              />
            )}
          </div>
        ))}
      </Zoom>
    </div>
  )
}
