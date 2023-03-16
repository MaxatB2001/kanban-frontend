import { useEffect, useState } from "react"

const getWindowDimensions = () => {
  const {innerHeight:heitht, innerWidth:width} = window
  return {
    heitht,
    width
  }
}

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowDimensions(getWindowDimensions())
    }
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])
  return windowDimensions;
}