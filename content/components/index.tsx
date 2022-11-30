import React, { useEffect, useState } from "react"
import Popup from "./popup"

export default () => {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    window.onmousemove = (e) => {
      const selectedText = window.getSelection()?.toString() ?? null

      if (!e.shiftKey || selectedText === null || selectedText === "") {
        setShowPopup(false)
        return
      }
      setShowPopup(true)
    }

    window.addEventListener("keyup", (e) => {
      if(e.key === "Shift") setShowPopup(false)
    });
  }, [])

  if (!showPopup) return <></>

  return (
    <>
      <Popup />
    </>
  )
}
