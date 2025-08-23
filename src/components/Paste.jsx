import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FaRegCalendarAlt, FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from 'react-icons/fa';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste deleted");
  };

  const handleShare = async (paste) => {
    const shareData = {
      title: paste.title || 'Shared Paste',
      text: paste.content,
      url: window.location.origin + `/paste/${paste._id}`
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully');
      } else {
        const shareUrl = `${window.location.origin}/paste/${paste._id}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Share link copied to clipboard');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(paste.content);
          toast.success('Content copied to clipboard');
        } catch {
          toast.error('Unable to share');
        }
      }
    }
  };

  return (
    <div className="p-6 ">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          className="p-3 rounded-2xl min-w-[600px] border-2 border-orange-400 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Pastes List */}
      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto  bg-white shadow-xl rounded-2xl">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-white border border-orange-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Header: Title left, Buttons right */}
              <div className="flex justify-between items-start mb-4">
                <div className="text-xl font-extrabold text-gray-600">
                  {paste.title}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`/?PasteId=${paste?._id}`}
                    className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 !text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform items-center gap-1"
                  >
                    <FaEdit size={14} />
                  </a>

                  <a
                    href={`/pastes/${paste?._id}`}
                    className="inline-flex px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 !text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform items-center gap-1"
                  >
                    <FaEye size={14} />
                  </a>


                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className=" px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 !text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                  >
                    <FaTrash size={14} />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to clipboard');
                    }}
                    className="px-3 py-1  bg-gradient-to-r from-orange-500 to-yellow-400 !text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                  >
                    <FaCopy size={14} />
                  </button>

                  <button
                    onClick={() => handleShare(paste)}
                    className="px-3 py-1  bg-gradient-to-r from-orange-500 to-yellow-400 !text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform flex items-center gap-1"
                  >
                    <FaShareAlt size={14} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-700 whitespace-pre-wrap text-left">
                {paste.content}
              </div>

              {/* Footer: date with calendar icon */}
              <div className="mt-4 flex justify-end items-center gap-2 text-sm text-gray-500">
                <FaRegCalendarAlt className="text-gray-400" />
                <span>{new Date(paste.createdAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No pastes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
