import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'; // Add these imports
import { useSearchParams } from 'react-router-dom'; // Add this import
import { removeFromPaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, SetsearchTerm] = useState(''); // Changed from useState
  const dispatch = useDispatch();

  // Fixed the filtering logic with proper error handling
  const filteredData = pastes.filter((paste) => {
    // Safety check: ensure paste and paste.title exist before calling toLowerCase
    if (!paste || !paste.title) return false;
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  async function handleShare(paste) {
    const shareData = {
      title: paste.title || 'Shared Paste',
      text: paste.content,
      url: window.location.origin + `/paste/${paste._id}` // Assumes you have a route for individual pastes
    };

    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Shared successfully');
      } else {
        // Fallback: Copy share link to clipboard
        const shareUrl = `${window.location.origin}/paste/${paste._id}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Share link copied to clipboard');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        // Fallback: Copy content to clipboard if share fails
        try {
          await navigator.clipboard.writeText(paste.content);
          toast.success('Content copied to clipboard');
        } catch (clipboardError) {
          toast.error('Unable to share');
        }
      }
    }
  }

  return (
    <div>
      <input
        className='p-2 rounded-2xl min-w-[600px] mt-5'
        type="search"
        placeholder="Seasrch here"
        value={searchTerm}
        onChange={(e) => SetsearchTerm(e.target.value)} />


      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className=' flex flex-row gap-4 place-content-evenly'>
                    <button>
                      <a href={`/?PasteId=${paste?._id}`}>Edit</a>
                    </button>
                    <button>
                      <a href={`/pastes/${paste?._id}`}>View</a>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success('Copied to clipboard')
                    }}>
                      Copy
                    </button>
                    <button onClick={() => handleShare(paste)}>
                      Share
                    </button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>

              )

            }

          )
        }

      </div>
    </div>
  )
}

export default Paste