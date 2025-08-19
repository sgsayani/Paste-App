import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // value: 0,
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {

    },
    updateToPastes: (state, action) => {

    },
    resetAllPastes: (state, action) => {

    },
    removeFromPaste(state, action) {

    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, 
  incrementByAmount } = pasteSlice.actions

export default pasteSlice.reducer