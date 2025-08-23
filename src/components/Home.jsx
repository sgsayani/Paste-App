import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("PasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-6 bg-white shadow-xl rounded-2xl">
      {/* Title Input & Button */}
      <div className="flex flex-row gap-6 place-content-between">
        <input
          className="p-3 rounded-xl w-2/3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="px-6 py-3 rounded-xl font-semibold text-white 
                     bg-gradient-to-r from-orange-500 to-yellow-400 
                     hover:from-orange-600 hover:to-yellow-500 
                     shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      {/* Textarea */}
      <div className="mt-6">
        <textarea
          className="rounded-xl w-full p-4 border border-gray-300 shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-orange-400 
                     min-h-[300px]"
          value={value}
          placeholder="Enter content..."
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
