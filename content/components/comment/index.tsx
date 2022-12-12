import React, { useEffect, useState, useRef } from "react"
import Save from "./popup"

import { styleNode, createXpath } from "../../modules/dom"
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
  const [showPopup, setShowPopup] = useState(false)
  const [selectedNode, setSelectedNode] = useState<Element | undefined | null>(
    undefined
  )

  const onSave = async (text: string) => {
    if(selectedNode === null || selectedNode === undefined) return

    const xpath = createXpath(selectedNode)
    const savedNotes = (await getStorage(document.URL)) ?? []


    highlightNode(selectedNode)
    setStorage(document.URL, [...savedNotes, { xpath }])
    setShowPopup(false)
    setSelectedNode(undefined)
    window.getSelection()?.removeAllRanges()
  }

  const onCancel = () => {
    setShowPopup(false)
    setSelectedNode(undefined)
  }

  const onLoad = async () => {
    const savedNotes = await getStorage(document.URL)
    if(savedNotes === undefined) return

    savedNotes.forEach((note) => {
      const savedNode = document
        .evaluate(note.xpath, document)
        .iterateNext() as Element

      if (savedNode !== null && savedNode !== undefined)
        highlightNode(savedNode)
    })
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

  return <Save open={showPopup} onSave={onSave} onCancel={onCancel} />
}
