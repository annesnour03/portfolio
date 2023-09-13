import { useEffect, useRef } from "react";
import AceEditor from "react-ace";

import { useReduxDispatch, useReduxSelector } from "store";
import { type File } from "store/fileSystemSlice";
import { hideVim } from "store/vimSlice";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vim";

import * as keybindingVim from "ace-builds/src-noconflict/keybinding-vim";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-plain_text";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow_night";

type VimProps = {
  filename: string | null;
};

export const Vim = ({ filename }: VimProps) => {
  const editorRef = useRef<AceEditor | null>(null);
  const dispatch = useReduxDispatch();
  const { vimSlice, fileSystemSlice } = useReduxSelector(
    (state) => state.terminal
  );
  const currentFile: File = fileSystemSlice.files.find(
    (f) => f.name === filename
  )!;
  const onChange = (newValue: string) => {};
  const VimApi = keybindingVim.CodeMirror.Vim;

  VimApi.defineEx("quit", "q", () => {
    dispatch(hideVim());
    editorRef.current?.forceUpdate();
  });

  useEffect(() => {
    if (editorRef.current && vimSlice.visible) {
      const editor = editorRef.current.editor;
      editor.setOption("relativeLineNumbers", true);
      setTimeout(() => {
        editorRef.current?.editor.focus();
        editorRef.current?.forceUpdate();
      }, 100);
    }
  }, [vimSlice]);

  return (
    <div className="flex h-full items-center justify-center">
      <AceEditor
        key={currentFile.name}
        ref={editorRef}
        style={{ width: "900px" }}
        mode={currentFile.language}
        theme="tomorrow_night"
        onChange={onChange}
        name="vim"
        keyboardHandler="vim"
        fontSize={18}
        value={currentFile?.content ?? ""}
        editorProps={{ $blockScrolling: true }}
        focus
      />
    </div>
  );
};
