import { GITHUB_SOURCE_URL, LINKEDIN_URL } from "appconstants";
import * as bin from "./index";
import { openLink } from "helpers/General";

export const test = () => {
  return <>inbin</>;
};

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
    <p>
      Welcome, my name is
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noreferrer"
        className="text-cyan-300"
      >
        Annes Negmel-Din
      </a>
    </p>
  );
};

export const src = () => {
  openLink(GITHUB_SOURCE_URL);
  return <></>;
};
