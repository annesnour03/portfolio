import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VimState {
  visible: boolean;
  filepath: string | null;
}

const initialState = { visible: false, filepath: null } as VimState;

const VimSlice = createSlice({
  name: "vim",
  initialState,
  reducers: {
    showVim(state, action: PayloadAction<string | null>) {
      state.visible = true;
      state.filepath = action.payload;
    },
    hideVim(state) {
      state.visible = false;
      state.filepath = null;
    },
  },
});

export const { showVim, hideVim } = VimSlice.actions;
export default VimSlice.reducer;
