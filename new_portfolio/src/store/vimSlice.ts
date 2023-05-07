import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface VimState {
  value: number
}

const initialState = { value: 0 } as VimState

const VimSlice = createSlice({
  name: 'vim',
  initialState,
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = VimSlice.actions
export default VimSlice.reducer

