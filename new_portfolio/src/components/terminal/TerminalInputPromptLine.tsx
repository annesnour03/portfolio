import {
  Dispatch,
  RefObject,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from "react";
import tw from "tailwind-styled-components";
import PS1 from "./PS1";
import { TerminalHistory } from "pages/Terminal";
import { commandExists, runCommand, scrollSmoothlyToBottom } from "./utils";

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

export const TerminalInputPromptLine = ({
  history,
  setHistory,
  inputRef,
}: {
  history: TerminalHistory[];
  setHistory: Dispatch<SetStateAction<TerminalHistory[]>>;
  inputRef: RefObject<HTMLInputElement>;
}) => {
  const handleOnChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setPrompt(target.value);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // Handle submission
    if (key === "Enter") {
      e.preventDefault();
      // Create a TerminalHistory object and push it to the history.
      setHistory([
        ...history,
        {
          command: prompt,
          commandValid: commandExists(prompt),
          output: runCommand(prompt),
        },
      ]);
      setPrompt("");
      // After we have inserted the history, we scroll smoothly to it.
      scrollSmoothlyToBottom("term");
    } else if (key === "Tab") {
      e.preventDefault();
    } else if (e.ctrlKey && key === "c") {
      e.preventDefault();
      setHistory([
        ...history,
        {
          command: prompt,
          commandValid: commandExists(prompt),
          output: <></>,
        },
      ]);
      setPrompt("");
      // After we have inserted the history, we scroll smoothly to it.
      scrollSmoothlyToBottom("term");
    }
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [prompt, setPrompt] = useState<string>("");
  return (
    <>
      <span className="flex flex-row items-center">
        <PS1 />
        <InputField
          autoCorrect="false"
          autoCapitalize="false"
          autoComplete="false"
          spellCheck="false"
          ref={inputRef}
          className=""
          id="latest-input"
          key="enterInput"
          value={prompt}
          onChange={handleOnChange}
          onKeyDown={handleKey}
          $commandValid={commandExists(prompt)}
          onBlur={({ target }) => target.focus()}
          autoFocus
        />
      </span>
    </>
  );
};
