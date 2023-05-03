import {
  GITHUB_SOURCE_URL,
  LINKEDIN_URL,
  asciiAnnes,
  myAge,
} from "appconstants";
import { openLink } from "helpers/General";

import * as bin from "./index";

export const help = () => {
  const allCommands: string[] = Object.keys(bin);
  return (
    <div>
      Currently available commands:
      {allCommands.map((command) => (
        <p key={command}>{command}</p>
      ))}
    </div>
  );
};

export const welcome = () => {
  return (
    <div>
      {asciiAnnes}
      <p>
        Welcome, my name is{" "}
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="text-cyan-300"
        >
          Annes Negmel-Din
        </a>
        . I am a {myAge}-year-old Computer Science student and this is my
        interactive terminal portfolio.
      </p>
      <p>
        To get started with some commands, type "
        <p className="inline-block text-cyan-300">help</p>".
      </p>
      <p>
        You can go back into your command history with the{" "}
        <p className="inline-block text-cyan-300">UP/DOWN</p> arrows.
      </p>
      <p>
        You can also accept a suggestion by simply pressing the{" "}
        <p className="inline-block text-cyan-300">TAB</p> key.
      </p>
    </div>
  );
};

export const src = () => {
  openLink(GITHUB_SOURCE_URL);
  return <></>;
};

export const whoami = () => {
  return <>guest</>;
};
