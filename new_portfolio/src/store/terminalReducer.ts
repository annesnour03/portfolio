import { combineReducers } from "@reduxjs/toolkit";
import fileSystemSlice from "./fileSystemSlice";
import vimSlice from "./vimSlice";

const terminalReducer = combineReducers({
  vimSlice: vimSlice,
  fileSystemSlice: fileSystemSlice,
});

export default terminalReducer;
