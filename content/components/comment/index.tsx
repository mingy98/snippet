import React, { useEffect, useState, useRef } from "react"
import Save from "./popup"
import Success from "./success"

import { styleNode } from "../../modules/dom"
import { getStorage, setStorage } from "../../modules/storage"

const commentKey = "c"

const highlightNode = (node: Element) => {
  styleNode(
    node,
    "bg-yellow-400",
    "bg-opacity-50",
    "underline",
    "decoration-indigo-700"
  )
}

export default () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Element | undefined | null>(
    undefined
  )

  const onSave = (text: string) => {
    // Save it
    if (selectedNode !== null && selectedNode !== undefined)
      highlightNode(selectedNode)

    setShowPopup(false)
    setShowSuccess(true)
    setSelectedNode(undefined)

    setStorage(document.URL, [
      {
        text: selectedNode?.innerHTML,
      },
    ])

    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  const onCancel = () => {
    setShowPopup(false)
    setSelectedNode(undefined)
  }

  const onLoad = async () => {
    const savedNotes = await getStorage(document.URL)
    if (savedNotes !== undefined) {
      savedNotes.forEach((note) => {
        console.log(note.text)
        const savedNode = document
          .evaluate(`//*[contains(text(), '${note.text}')]`, document)
          .iterateNext() as any

        console.log(savedNode)
        
        if (savedNode !== null && savedNode !== undefined) {
          highlightNode(savedNode)
        }
      })
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key !== commentKey) return
      if (e.metaKey) return
      if (e.ctrlKey) return
      if ((window.getSelection()?.toString() ?? "") === "") return

      setSelectedNode(
        window.getSelection()?.getRangeAt(0).startContainer
          .parentNode as Element
      )
      setShowPopup(true)
    })
  }, [])

  useEffect(() => {
    onLoad()
  }, [])

  if (showSuccess) return <Success />
  return <Save open={showPopup} onSave={onSave} onCancel={onCancel} />
}
