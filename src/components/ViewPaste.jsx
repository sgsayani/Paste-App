import React, { useEffect, useState} from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';  // Added updateToPastes import

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);
  console.log(paste,';hi')
  console.log(allPastes,'data')


  if (!paste) {
    return <div className="p-4 text-red-500">Paste not found!</div>
  }
  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-2xl mt-2 w-[66%] border-2 border-black'
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button
          onClick={createPaste}
          className='p-3 rounded-2xl mt-2'
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button> */}
      </div>

      <div className='mt-8'>
        <textarea
          className='rounded-2xl mt-4 min-w-[500px] p-4 border-2 border-black'
          value={paste.content} // Changed from 'Value' to 'value'
          placeholder='Enter content'
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
