import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';  // Added updateToPastes import

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(''); // Changed 'Value' to 'value' for consistency
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("PasteId");
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title: title,
      content: value, // Now matches the state variable name
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }
    
    //after create or update
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input 
          className='p-1 rounded-2xl mt-2 w-[66%] border-2 border-black'
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button 
          onClick={createPaste}
          className='p-3 rounded-2xl mt-2'
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
      
      <div className='mt-8'>
        <textarea 
          className='rounded-2xl mt-4 min-w-[500px] p-4 border-2 border-black'
          value={value} // Changed from 'Value' to 'value'
          placeholder='Enter content'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home