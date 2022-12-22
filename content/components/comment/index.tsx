import React, { useEffect, useState, useRef } from "react"
import Save from "./popup"

import { styleNode, createXpath } from "../../modules/dom"
import { getStorage, setStorage } from "../../modules/storage"

const commentKey = "s"

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
  const [showPopup, setShowPopup] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Element | undefined | null>(
    undefined
  )
  const popupRef = useRef<HTMLDivElement>(null)

  const onSave = async () => {
    if (selectedNode === null || selectedNode === undefined) return

    const xpath = createXpath(selectedNode)
    const savedNotes = (await getStorage(document.URL)) ?? []

    highlightNode(selectedNode)
    setStorage(document.URL, [...savedNotes, { xpath }])
    setShowPopup(false)
    setSelectedNode(undefined)
    window.getSelection()?.removeAllRanges()
  }

  const onLoad = async () => {
    const savedNotes = await getStorage(document.URL)
    if (savedNotes === undefined) return

    savedNotes.forEach((note) => {
      const savedNode = document
        .evaluate(note.xpath, document)
        .iterateNext() as Element

      if (savedNode !== null && savedNode !== undefined)
        highlightNode(savedNode)
    })
  }

  // Highlight previously-higlighted text on page load
  useEffect(() => {
    onLoad()
  }, [])

  // Show the save button when the user requests it
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

  // Detect clicks outside of the popup to hide the popup
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        !popupRef.current ||
        !popupRef.current.contains(event.target as Node)
      ) {
        // The click occurred outside of the div, so you can do something here
        setShowPopup(false)
        setSelectedNode(undefined)
      }
    }
    document.addEventListener("click", handleClick)

    // Return a cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return <Save open={showPopup} onSave={onSave} ref={popupRef} />
}
