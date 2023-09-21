import React, { useState, useEffect } from "react"
//These are Third party packages for smooth slideshow
import "react-slideshow-image/dist/styles.css"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
// import supabase from "../utils/supabase";
import { toast } from "react-hot-toast"
import ChooseContent from "./ChooseContent"

const Slideshow = ({ supabase }) => {
  const [selected, setSelected] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [images, setImages] = useState([])

  useEffect(() => {
    setSelected("")
  }, [selectedStore])

  return (
    <ChooseContent
      supabase={supabase}
      selected={selected}
      setSelected={setSelected}
      selectedStore={selectedStore}
      setSelectedStore={setSelectedStore}
      images={images}
      setImages={setImages}
    />
  )
}

export default Slideshow
