import { createSlice } from "@reduxjs/toolkit";
import { files } from "appconstants";

export type File = {
  name: string;
  language: string;
  content: string;
};

interface FileSystemState {
  files: File[];
}

const initialState = {
  files: files,
} as FileSystemState;

const FileSystemSlice = createSlice({
  name: "filesystem",
  initialState,
  reducers: {},
});

export const {} = FileSystemSlice.actions;
export default FileSystemSlice.reducer;
