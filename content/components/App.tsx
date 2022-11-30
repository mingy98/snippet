import React, { useEffect } from "react"

export default () => {
  useEffect(() => {
    window.onmousemove = (e) => {
      if (!e.shiftKey || window.getSelection()?.toString() === undefined) return
      const selectedText = window.getSelection()?.toString()
      console.log(selectedText)
    }
  }, [])

  return (
    <div>
    </div>
  )
}


