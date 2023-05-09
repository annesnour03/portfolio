import store from "store";

export const checkFileExists = (filename: string) => {
  const { terminal } = store.getState();
  return terminal.fileSystemSlice.files.some((file) => file.name === filename);
};
