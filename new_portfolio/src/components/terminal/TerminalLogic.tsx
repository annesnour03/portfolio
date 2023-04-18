import React, { SyntheticEvent, useRef, useState } from "react";
import ReactDOM from "react-dom";
import tw from "tailwind-styled-components";
import { TerminalInputPromptLine } from "./TerminalInputPromptLine";

export class TerminalLogic {
  public inputArea: HTMLTextAreaElement | undefined;
  public startPrompt: JSX.Element | undefined;

  public history: JSX.Element[] = [];
  private changeHistory;
  private commandHistory: string[] = [];
  private ref: React.MutableRefObject<HTMLDivElement | null>;

  constructor(
    ref: React.MutableRefObject<HTMLDivElement | null>,
    his: [JSX.Element[], React.Dispatch<React.SetStateAction<JSX.Element[]>>]
  ) {
    this.startPrompt = this.getTextPrompt();
    this.ref = ref;
    this.history = his[0];
    this.changeHistory = his[1];
    this._displayInputLine();
    console.log("hellooo");
  }
  private _displayInputLine(): void {
    console.log("len his", this.history, this.history.length);
    this.changeHistory([...this.history, this.getTextPrompt()]);
  }
  public handleCommandSubmit(command: string): void {
    // We evaluate the command
    console.log("incomming command", command);
    this._displayInputLine();
    this.addCommandToHistory(command);
  }

  private addCommandToHistory(command: string): void {
    this.commandHistory.push(command);
  }

  private getTextPrompt() {
    const A = tw.textarea`
    border-none
    opacity-100
    bg-transparent
    resize-none
    h-[24px]
    select-none
    outline-none
    font-[UbuntuMono]
    overflow-y-auto
    w-[calc(99%-60px)]
    `;

    const Txt = tw.p`
    font-[UbuntuMono]
    inline-block
    `;

    const TerminalInputPrompt = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const textRef = useRef<any>();
      const onChangeHandler = function (e: SyntheticEvent) {
        const target = e.target as HTMLTextAreaElement;
        setPrompt(target.value);
        textRef.current.style.height = "20px";
        textRef.current.style.height = `${target.scrollHeight}px`;
      };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [prompt, setPrompt] = useState<string>("");
      return (
        <>
          <button onClick={() => this.handleCommandSubmit("")}>ttt</button>
          {this.history.length}{" "}
        </>
      );
      return (
        <>
          <span className="flex w-full">
            <Txt>annes $&nbsp;</Txt>
            <A
              autoCorrect="false"
              autoCapitalize="false"
              autoComplete="false"
              spellCheck="false"
              className="dbg"
              ref={textRef}
              value={prompt}
              onChange={onChangeHandler}
              onSubmit={(event) => console.log(event)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  this.handleCommandSubmit(prompt);
                }
              }}
            ></A>
          </span>
        </>
      );
    };

    return <TerminalInputPrompt />;
  }
}
