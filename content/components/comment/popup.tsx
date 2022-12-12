import React, { Fragment, useRef, useEffect, useState } from "react"
import { Transition } from "@headlessui/react"
import ContentEditable, { ContentEditableEvent } from "react-contenteditable"

export default (props: {
  open: boolean
  onSave: (text: string) => void
  onCancel: () => void
}) => {
  const textAreaRef = useRef<any>(null)
  const [text, setText] = useState("")

  const onChange = (evt: ContentEditableEvent) => {
    if (evt.target.value !== null) setText(evt.target.value)
  }

  useEffect(() => {
    if (props.open) textAreaRef.current?.focus()
  }, [props.open])

  return (
    <Transition
      as={Fragment}
      show={props.open}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed z-[2147483647] bottom-3 left-3 rounded text-gray-100 shadow-2xl bg-white w-full max-w-sm">
        <div className="overflow-hidden">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <ContentEditable
            placeholder="Your best thoughts here..."
            innerRef={textAreaRef}
            html={""}
            onChange={onChange}
            className="block bg-white w-full resize-none border-0 outline-none p-3 sm:text-sm text-gray-900"
          />
          <div className="py-2" aria-hidden="true">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 py-2 pl-3 pr-2 flex space-x-2 justify-right">
          <button
            onClick={() => props.onCancel()}
            type="submit"
            className="inline-flex items-center rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-600 shadow-sm focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => props.onSave(text)}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </Transition>
  )
}
