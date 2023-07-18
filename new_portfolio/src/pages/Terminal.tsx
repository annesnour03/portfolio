import "index.css";
import { useEffect, useRef, useState } from "react";
import { useReduxSelector } from "store";
import tw from "tailwind-styled-components";

import PS1 from "components/terminal/PS1";
import { TerminalInputPromptLine } from "components/terminal/TerminalInputPromptLine";
import { runCommand } from "components/terminal/utils";
import { Vim } from "components/terminal/vim";

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
    overflow-y-hidden
    break-all
    flex-grow
    `;

export const Terminal = ({}: Props) => {
  const startCommand: string = "welcome";
  const { vimSlice } = useReduxSelector((state) => state.terminal);
  const termRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [history, setHistory] = useState<TerminalHistory[]>([]);
  useEffect(() => {
    runCommand(startCommand).then((data) =>
      setHistory([
        {
          command: startCommand,
          commandValid: true,
          //@ts-ignore the start command should always be sync.
          output: data,
        },
      ])
    );
  }, [startCommand]);

  const scrollToBottom = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [history]);
  return (
    <div className="h-full w-full overflow-hidden text-white">
      <div
        ref={termRef}
        className="h-full w-full overflow-hidden font-[UbuntuMono]"
        id="term"
      >
        <div className="h-full overflow-y-hidden rounded border-2 border-blue-700 p-7">
          <div
            id="ace_vim_wrapper"
            className="absolute top-0 left-0 w-full h-full z-20"
            style={{ display: vimSlice.visible === false ? "none" : "" }}
          >
            <div className="flex justify-center items-center h-full">
              {vimSlice.visible && <Vim filename={vimSlice.filepath} />}
            </div>
          </div>
          <div className="inner h-full overflow-y-scroll overflow-x-hidden">
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
