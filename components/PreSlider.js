import React, { useState, useEffect } from "react"
//These are Third party packages for smooth slideshow
import "react-slideshow-image/dist/styles.css"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
// import supabase from "../utils/supabase";
import { toast } from "react-hot-toast"
import ChooseContentAdmin from "./ChooseContentAdmin"
import ChooseContentIndividual from "./ChooseContentIndividual"

const Slideshow = ({ supabase, session }) => {
  const [selected, setSelected] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [images, setImages] = useState([])

  let selectedStoreValue = "" // Initialize selectedStoreValue variable
  const userEmail = session?.user?.email

  switch (userEmail) {
    case "kolas@blumenfeld.com":
      selectedStoreValue = "Kolas Blumenfeld"
      break
    case "kolas@mainave.com":
      selectedStoreValue = "Kolas Main Ave"
      break
    case "kolas@fruitridge66.com":
      selectedStoreValue = "Kolas Fruitridge - 66"
      break
    case "kolas@florin.com":
      selectedStoreValue = "Kolas Florin Perkins"
      break
    case "kolas@fruitridgesouth.com":
      selectedStoreValue = "Kolas Fruitridge - South Watt"
      break
    case "kolas@arden.com":
      selectedStoreValue = "Kolas Arden"
      break
    default:
      selectedStoreValue = "" // Set a default value or empty string if no match
  }

  return userEmail === "kolas@admin.com" ? (
    <ChooseContentAdmin
      session={session}
      supabase={supabase}
      selected={selected}
      setSelected={setSelected}
      selectedStore={selectedStore}
      setSelectedStore={setSelectedStore}
      images={images}
      userEmail={userEmail}
      setImages={setImages}
    />
  ) : (
    <ChooseContentIndividual
      session={session}
      supabase={supabase}
      selected={selected}
      setSelected={setSelected}
      selectedStore={selectedStoreValue}
      setSelectedStore={setSelectedStore}
      images={images}
      userEmail={userEmail}
      setImages={setImages}
    />
  )
}

export default Slideshow
