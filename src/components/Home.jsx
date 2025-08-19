import React,{useState} from 'react'
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState('');
  const [Value,setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("PasteId");


  return (
    <div>
      <div className='flex flex-row gap-7'>
      <input className='p-3 rounded-2xl mt-2'
      type="text"
      placeholder="Enter title here"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />

      <button className='p-3 rounded-2xl mt-2'>
        {
          pasteId ? "Update Paste" : "Create Paste"
        }
      </button>
    </div>
    <div className='mt-8'>
      <textarea 
      className='rounded-2xl mt-4 min-w-[500px] p-4'
      value={Value}
      placeholder='Enter conetnt'
      onChange={(e)=>setValue(e.target.value)}
      rows={20}></textarea>
    </div>
    </div>
  )
}

export default Home
