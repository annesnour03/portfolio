import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import "index.css";
import { TerminalInputPromptLine } from "components/terminal/TerminalInputPromptLine";
import PS1 from "components/terminal/PS1";
type Props = {};
export type TerminalHistory = {
  command: string;
  commandValid: boolean;
  output: JSX.Element;
};

const InputFieldLocked = tw.p<{ $commandValid: boolean }>`
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
    `;

export const Terminal = ({}: Props) => {
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [history]);
  return (
    <div className="h-full w-full overflow-hidden p-2 text-white">
      <div
        ref={termRef}
        className="h-full w-full overflow-hidden font-[UbuntuMono]"
        id="term"
      >
        <div className="h-full overflow-y-hidden rounded border-2 border-blue-700 p-7">
          <div className="inner h-full overflow-y-scroll">
            {history.map((hisInstance, idx) => (
              <div key={`${hisInstance.command}${idx}`}>
                {/* Inputline */}
                <span className="flex flex-row items-center">
                  <PS1 />
                  <InputFieldLocked
                    $commandValid={hisInstance.commandValid}
                    key={`${hisInstance.command}${idx}`}
                  >
                    {hisInstance.command}
                  </InputFieldLocked>
                </span>
                {/* Output */}
                <div key={`${hisInstance.output}${idx}`}>
                  {hisInstance.output}
                </div>
              </div>
            ))}
            <TerminalInputPromptLine
              inputRef={inputRef}
              history={history}
              setHistory={setHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
