import { combineReducers } from "@reduxjs/toolkit";

import vimSlice from "./vimSlice";

const terminalReducer = combineReducers({
  vimSlice: vimSlice,
});

export default terminalReducer;
