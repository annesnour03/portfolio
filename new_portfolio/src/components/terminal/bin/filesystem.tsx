import { checkFileExists } from "helpers/SliceHelpers";
import store from "store";
import { File } from "store/fileSystemSlice";
import { showVim } from "store/vimSlice";

export const vim = (argv: string[]) => {
  const filename = [...argv].join();
  if (filename.trim().length === 0 || !filename)
    return (
      <>
        Invalid usage of the vim command, pass in a filename to edit. Type{" "}
        <span className="inline-block text-cyan-300">ls</span> to see files!
      </>
    );
  // Check if file exists
  if (!checkFileExists(filename))
    return (
      <>
        Invalid file. Type{" "}
        <span className="inline-block text-cyan-300">ls</span> to see files!
      </>
    );
  store.dispatch(showVim(argv.length === 0 ? null : argv.join()));
  // We hold the prompt untill we are done with editing in vim
  return new Promise<JSX.Element>((resolve) => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (!state.terminal.vimSlice.visible) {
        // Unsubscribe from the store to prevent further changes
        unsubscribe();
        // Resolve the Promise
        resolve(<></>);
      }
    });
  });
};

export const ls = () => {
  const { terminal } = store.getState();
  const allFiles = terminal.fileSystemSlice.files;
  const getStringSizeBytes = (input: string): number => {
    return new TextEncoder().encode(input).length;
  };
  return (
    <>
      {allFiles.map((file) => (
        <div className="flex gap-2" key={file.name}>
          <p className="inline-block" key={`${file.name}perms`}>
            -rw-rw-r--
          </p>
          <p className="inline-block" key={`${file.name}links`}>
            1
          </p>
          <p className="inline-block" key={`${file.name}owner`}>
            guest
          </p>
          <p className="inline-block" key={`${file.name}owner2`}>
            guest
          </p>
          <p className="inline-block" key={`${file.name}size`}>
            {getStringSizeBytes(file.content)}
          </p>
          <p className="inline-block" key={`${file.name}name`}>
            {file.name}
          </p>
        </div>
      ))}
    </>
  );
};

export const cat = (argv: string[]) => {
  const filename = [...argv].join();
  if (filename.trim().length === 0 || !filename)
    return (
      <>
        Invalid usage of the cat command, pass in a filename to edit. Type{" "}
        <span className="inline-block text-cyan-300">ls</span> to see files!
      </>
    );
  // Check if file exists
  if (!checkFileExists(filename))
    return (
      <>
        Invalid file. Type{" "}
        <span className="inline-block text-cyan-300">ls</span> to see files!
      </>
    );
  const state = store.getState();
  const { fileSystemSlice } = state.terminal;
  const currentFile: File = fileSystemSlice.files.find(
    (f) => f.name === filename
  )!;
  return <div className="whitespace-pre-wrap">{currentFile.content}</div>;
};
