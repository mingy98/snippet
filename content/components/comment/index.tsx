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

  const onSave = async (text: string) => {
    // Save it
    if (selectedNode !== null && selectedNode !== undefined) {
      highlightNode(selectedNode)

      // Create xpath
      const textContent = selectedNode.textContent ?? ""
      const quoteIndicies = [
        ...textContent.matchAll(new RegExp(`'|"`, "gi")),
      ].map((a) => a.index)
      let splitContent: string[] = []
      let lastIdx = 0

      const format = (quote: string, startIdx: number, endIdx: number) =>
        `contains(., ${quote}${textContent.slice(
          startIdx,
          endIdx + 1
        )}${quote})`

      quoteIndicies.forEach((quoteIdx, index) => {
        if (quoteIdx !== undefined) {
          let quote = textContent[quoteIdx] === "'" ? `\"` : `\'`
          splitContent.push(format(quote, lastIdx, quoteIdx))
          lastIdx = quoteIdx + 1

          if (index === quoteIndicies.length - 1) {
            splitContent.push(format(quote, lastIdx, textContent.length))
          }
        }
      })

      if(splitContent.length === 0) splitContent.push(format(`\"`, 0, textContent.length))

      const xpath = `//${selectedNode.nodeName.toLowerCase()}[${splitContent.join(
        " and "
      )}]`

      const savedNotes = await getStorage(document.URL) ?? []
      setStorage(document.URL, [...savedNotes, { xpath }])
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

  const onLoad = async () => {
    const savedNotes = await getStorage(document.URL)
    if (savedNotes !== undefined) {
      savedNotes.forEach((note) => {
        const savedNode = document
          .evaluate(note.xpath, document)
          .iterateNext() as any

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
