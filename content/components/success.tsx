import React from "react"

export default () => {
  return (
    <div className="fixed z-[2147483647] bottom-3 left-3 rounded-xl text-gray-100 shadow-2xl">
      <div className="flex space-x-3 items-center rounded-md bg-green-200 px-6 py-3 text-base font-medium text-green-700 focus:outline-none">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-green-700 font-bold"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <div>Saved</div>
      </div>
    </div>
  )
}
