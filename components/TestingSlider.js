import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import React from "react"
import Slider from "react-slick"
import ReactPlayer from "react-player"

export default function TestingSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const images = [
    {
      id: 79,
      created_at: "2023-09-27T20:21:47.203329+00:00",
      src: "images/Kolas Arden/Diapositiva1.jpeg",
      duration: 5,
      start_date: "2023-09-28",
      finish_date: "2023-09-30",
      store: "Kolas Arden",
      isVideo: false,
    },
    {
      id: 80,
      created_at: "2023-09-27T20:21:47.755643+00:00",
      src: "images/Kolas Arden/Diapositiva2.jpeg",
      duration: 5,
      start_date: "2023-09-28",
      finish_date: "2023-09-30",
      store: "Kolas Arden",
      isVideo: false,
    },
  ]

  const Cdn_URL =
    "https://ivgsvflymqeuiibnrerz.supabase.co/storage/v1/object/public/"
  return (
    <Slider {...settings}>
      <div className="w-full h-screen">
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
      </div>
    </Slider>
  )
}
