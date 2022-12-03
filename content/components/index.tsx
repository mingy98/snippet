import React, { useEffect, useState, useRef } from "react"
import Save from "./save"
import Success from "./success"

const specialKey = "c"
const enterKey = "Enter"

export default () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedNode, setSelectedNode] = useState<
    ParentNode | undefined | null
  >(undefined)

  const onSave = (text: string) => {
    // Save it
    const parentNode = selectedNode?.parentNode
    let clonedNode = selectedNode?.cloneNode(true) as any

    if (
      clonedNode !== undefined &&
      selectedNode !== undefined &&
      selectedNode !== null
    ) {
      clonedNode.innerHTML = `<span class="bg-[#ACCEF7] bg-opacity-50 underline decoration-indigo-700">${selectedNode.innerHTML}</span>`
      parentNode?.replaceChild(clonedNode, selectedNode)
    }

    setShowPopup(false)
    setShowSuccess(true)
    setSelectedNode(undefined)

    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const onCancel = () => {
    setShowPopup(false)
    setSelectedNode(undefined)
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key !== specialKey) return
      if (e.metaKey) return
      if (e.ctrlKey) return
      if ((window.getSelection()?.toString() ?? "") === "") return

      setSelectedNode(
        window.getSelection()?.getRangeAt(0).startContainer.parentNode
      )
      setShowPopup(true)
    })
  }, [])

  if (showSuccess) return <Success />
  return <Save open={showPopup} onSave={onSave} onCancel={onCancel} />
}
