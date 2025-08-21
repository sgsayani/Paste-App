import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'; // Add these imports
import { useSearchParams } from 'react-router-dom'; // Add this import

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchParams, setSearchParams] = useState(''); // Changed from useState
  const dispatch = useDispatch();

  // Fixed the filtering logic with proper error handling
  const filteredData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase()); // Fixed method name and logic
  });

  return (
    <div>
      <input type="search" placeholder="Search here" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      Paste List
      {/* You can now use filteredData to display your pastes */}
    </div>
  )
}

export default Paste