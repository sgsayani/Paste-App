import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ViewPaste = () => {
  const { id } = useParams()
  const allPastes = useSelector((state) => state.paste.pastes)
  const paste = allPastes.find((p) => p._id === id)

  if (!paste) {
    return (
      <div className="p-6 text-red-500 text-lg font-semibold">
        Paste not found!
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-xl rounded-2xl">
      {/* Header: Title */}
      <div className="mb-4">
        <input
          className="w-full text-2xl font-extrabold p-3 border-2 border-orange-300 rounded-2xl bg-gradient-to-r from-orange-50 to-yellow-50 text-gray-800 focus:outline-none shadow-md"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      {/* Content */}
      <div>
        <textarea
          className="w-full min-h-[300px] p-4 border-2 border-orange-300 rounded-2xl bg-orange-50 text-gray-800 focus:outline-none shadow-inner resize-none"
          value={paste.content}
          disabled
          rows={15}
        />
      </div>

      {/* Footer: Date */}
      <div className="mt-4 flex justify-end items-center gap-2 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{new Date(paste.createdAt).toLocaleString()}</span>
        </span>
      </div>
    </div>
  )
}

export default ViewPaste
