import { TerminalHistory } from "pages/Terminal";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useReduxSelector } from "store";
import tw from "tailwind-styled-components";

import PS1 from "./PS1";
import {
  commandExists,
  getAutoCompletePrompt,
  runCommand,
  scrollSmoothlyToBottom,
} from "./utils";

const InputField = tw.input<{ $commandValid: boolean }>`
  ${(p) => (p.$commandValid ? "text-green-600" : "text-red-600")}

    border-none
    opacity-100
    bg-transparent
    resize-none
    h-[24px]
    select-none
    outline-none
    font-[UbuntuMono]
    overflow-y-auto
    flex-grow
    caret-slate-600
    `;

const AutoCompleteText = tw.input`
    text-gray-600
    border-none
    opacity-100
    bg-transparent
    resize-none
    h-[24px]
    select-none
    outline-none
    font-[UbuntuMono]
    overflow-y-auto
    flex-grow
    caret-slate-600
    `;

export const TerminalInputPromptLine = ({
  history,
  setHistory,
  inputRef,
}: {
  history: TerminalHistory[];
  setHistory: Dispatch<SetStateAction<TerminalHistory[]>>;
  inputRef: RefObject<HTMLInputElement>;
}) => {
  const [allPrompts, setAllPrompts] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState<number>(
    allPrompts.length - 1
  );
  const [autoCompletePrompt, setAutoCompletePrompt] = useState<string>("");

  const { vimSlice } = useReduxSelector((state) => state.terminal);
  useEffect(() => {
    if (!vimSlice.visible) {
      inputRef.current?.focus();
    }
  }, [vimSlice]);

  const getLatestPrompt = (): string => allPrompts.at(-1) ?? "";
  const updateLatestPrompt = (newValue: string) => {
    setAllPrompts([...allPrompts.slice(0, -1), newValue]);
  };
  const pushNewPrompt = (newValue: string) => {
    setAllPrompts([...allPrompts, newValue]);
  };
  const handleOnChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    updateLatestPrompt(target.value);
    updateAutoCompletePrompt(target.value);
  };
  const updateAutoCompletePrompt = (newPromptValue: string) => {
    setAutoCompletePrompt(getAutoCompletePrompt(newPromptValue));
  };
  const resetAutoCompletePrompt = () => setAutoCompletePrompt("");
  const getCommandHistoryData = () => {
    const removeAdjacentDuplicates = (arr: string[]): string[] => {
      return arr.filter((elem, i) => i === 0 || elem !== arr[i - 1]);
    };
    return removeAdjacentDuplicates(allPrompts.filter((elem) => elem !== ""));
  };

  const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const latestPrompt = getLatestPrompt();
    // Handle submission
    if (key === "Enter") {
      e.preventDefault();
      // We have one special command, "clear", because it interacts with history.
      if (latestPrompt === "clear") {
        setHistory([]);
      } else {
        // Create a TerminalHistory object and push it to the history.
        setHistory([
          ...history,
          {
            command: latestPrompt,
            commandValid: commandExists(latestPrompt),
            output: await runCommand(latestPrompt),
          },
        ]);
      }
      setHistoryIndex(getCommandHistoryData().length);
      resetAutoCompletePrompt();

      pushNewPrompt(latestPrompt);
      pushNewPrompt("");

      // After we have inserted the history, we scroll smoothly to it.
      scrollSmoothlyToBottom("term");
    } else if (key === "Tab") {
      e.preventDefault();
      // If we have the possibility of autocompleting
      if (autoCompletePrompt !== "") {
        updateLatestPrompt(autoCompletePrompt);
        resetAutoCompletePrompt();
      }
    } else if (e.ctrlKey && key === "c" && !window.getSelection()?.toString()) {
      // If we pressed CNTRL + C and we did not have anything selected.
      e.preventDefault();

      setHistory([
        ...history,
        {
          command: latestPrompt,
          commandValid: commandExists(latestPrompt),
          output: <></>,
        },
      ]);

      updateLatestPrompt("");
      // After we have inserted the history, we scroll smoothly to it.
      scrollSmoothlyToBottom("term");
    } else if (key === "ArrowUp") {
      e.preventDefault();
      resetAutoCompletePrompt();

      // We have reached the end of the history
      if (historyIndex <= 0) {
        return;
      }

      updateLatestPrompt(getCommandHistoryData()[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    } else if (key === "ArrowDown") {
      e.preventDefault();
      resetAutoCompletePrompt();

      if (historyIndex >= getCommandHistoryData().length - 1) {
        updateLatestPrompt("");
        setHistoryIndex(getCommandHistoryData().length);
        return;
      }

      updateLatestPrompt(getCommandHistoryData()[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };
  return (
    <div className="relative">
      <span className="mb-[-24px] absolute flex flex-row items-center w-full -z-10">
        <PS1 />
        <AutoCompleteText
          autoCorrect="false"
          autoCapitalize="false"
          autoComplete="false"
          spellCheck="false"
          value={autoCompletePrompt}
          disabled
        />
      </span>
      <span className="z-10 absolute flex flex-row items-center w-full">
        <PS1 />
        <InputField
          autoCorrect="false"
          autoCapitalize="false"
          autoComplete="false"
          spellCheck="false"
          type="email"
          ref={inputRef}
          className=""
          id="latest-input"
          value={getLatestPrompt()}
          onChange={handleOnChange}
          onKeyDown={handleKey}
          $commandValid={commandExists(getLatestPrompt())}
          onBlur={({ target }) => !vimSlice.visible && target.focus()}
          autoFocus
        />
      </span>
    </div>
  );
};
