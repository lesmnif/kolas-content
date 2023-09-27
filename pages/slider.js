import Head from "next/head"
import Slideshow from "../components/PreSlider"

export default function Home() {
  return (
    <div>
      <Head>
        <title>FullPage Image Slider</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/pro.ico" />
      </Head>
      <Slideshow />
    </div>
  )
}
