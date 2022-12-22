import React, { Fragment, RefObject } from "react"
import { Transition } from "@headlessui/react"

export default (props: {
  open: boolean
  onSave: () => void
  ref: RefObject<HTMLDivElement>
}) => {
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
      <div className="fixed z-[2147483647] bottom-3 left-3 rounded text-gray-100 shadow-2xl" ref={props.ref}>
        <button
          onClick={() => props.onSave()}
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
        >
          Save
        </button>
      </div>
    </Transition>
  )
}
