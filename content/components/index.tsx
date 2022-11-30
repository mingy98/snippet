import React, { useEffect, useState, useRef } from "react"
import { text } from "stream/consumers"
import Popup from "./popup"

export default () => {
  const [shiftPressed, _setShiftPressed] = useState(false)
  const [textSelected, setTextSelected] = useState<string | null>(null)

  const shiftPressedRef = useRef(shiftPressed)
  const setShiftPressed = data => {
    shiftPressedRef.current = data
    _setShiftPressed(data)
  }

  useEffect(() => {
    document.addEventListener("selectionchange", () => {
      const selectedText = window.getSelection()?.toString() ?? ""
      const showPopup = shiftPressedRef.current && selectedText !== ""

      console.log(selectedText, showPopup)

      showPopup ? setTextSelected(selectedText) : setTextSelected(null)
    })

    window.addEventListener("keydown", (e) => {
      console.log("down", e.key)
      if (e.key === "Shift") setShiftPressed(true)
    })

    window.addEventListener("keyup", (e) => {
      if (e.key === "Shift") setShiftPressed(false)
    })
  }, [])

  if (!shiftPressed || textSelected === null) return <></>

  return (
    <>
      <Popup />
    </>
  )
}
