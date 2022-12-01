import React, { useEffect, useState, useRef } from "react"
import Save from "./save"
import Success from "./success"

const specialKey = "Alt"
const enterKey = "Enter"

export default () => {
  const [keyPressed, _setKeyPressed] = useState(false)
  const [textSelected, _setTextSelected] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const shiftPressedRef = useRef(keyPressed)
  const setShiftPressed = (data) => {
    shiftPressedRef.current = data
    _setKeyPressed(data)
  }

  const textedSelectedRef = useRef(textSelected)
  const setTextSelected = (data) => {
    textedSelectedRef.current = data
    _setTextSelected(data)
  }

  useEffect(() => {
    document.addEventListener("selectionchange", () => {
      if (shiftPressedRef.current) {
        setTextSelected(window.getSelection()?.toString() ?? "")
      } else {
        setTextSelected("")
      }
    })

    window.addEventListener("keydown", (e) => {
      if (e.key === specialKey) setShiftPressed(true)
    })

    window.addEventListener("keydown", (e) => {
      if (e.key === enterKey && textedSelectedRef.current !== "") {
        // Save it
        const selectedNode = window.getSelection()?.getRangeAt(0).startContainer
          .parentNode as any
        const parentNode = selectedNode?.parentNode
        let template = document.createElement("template")
        template.innerHTML = `<span class="bg-indigo-200 underline decoration-indigo-700">${selectedNode?.innerHTML}</span>`
        parentNode.replaceChild(template.content.firstChild, selectedNode)

        setTextSelected("")
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      }
    })

    window.addEventListener("keyup", (e) => {
      if (e.key === specialKey) setShiftPressed(false)
    })
  }, [])

  if (showSuccess) return <Success />
  return <Save open={textSelected !== ""} />
}
