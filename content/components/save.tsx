import React, { Fragment } from "react"
import { Transition } from "@headlessui/react"

export default (props: { open: boolean }) => {
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
      <div className="fixed z-[2147483647] bottom-3 left-3 rounded-xl text-gray-100 shadow-2xl bg-indigo-200">
        <button
          type="button"
          className="flex space-x-6 items-center rounded-md bg-indigo-200 px-6 py-3 text-base font-medium text-indigo-700 focus:outline-none"
        >
          <div>Save</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-indigo-700"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </Transition>
  )
}
