import {
  asciiAnnes,
  cow,
  GITHUB_SOURCE_URL,
  LINKEDIN_URL,
  LinuxLogo,
  myAge,
  myAgeDays,
} from "appconstants";
import { openLink } from "helpers/General";
import PS1 from "../PS1";
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
        <span className="inline-block text-cyan-300">help</span>".
      </p>
      <p>
        You can go back into your command history with the{" "}
        <span className="inline-block text-cyan-300">UP/DOWN</span> arrows.
      </p>
      <p>
        You can also accept a suggestion by simply pressing the{" "}
        <span className="inline-block text-cyan-300">TAB</span> key.
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

export const neofetch = () => {
  const InfoLine = ({
    infoKey,
    info,
  }: {
    infoKey: string;
    info: string;
  }): JSX.Element => {
    return (
      <div className="ansi37">
        <span className="font-bold">{infoKey}: </span>
        <span>{info}</span>
      </div>
    );
  };

  const getGPU = (): string | null => {
    const canvas = document.createElement("canvas");
    let gl: WebGLRenderingContext | RenderingContext | null;
    let debugInfo: WEBGL_debug_renderer_info | null;

    try {
      gl = canvas.getContext("webgl");
    } catch (e) {
      return null;
    }

    if (gl) {
      debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    return null;
  };

  const getOS = (): string | null => {
    let os = null;
    const clientStrings = [
      { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
      { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
      { s: "Windows Vista", r: /Windows NT 6.0/ },
      { s: "Windows Server 2003", r: /Windows NT 5.2/ },
      { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
      { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
      { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
      { s: "Windows 98", r: /(Windows 98|Win98)/ },
      { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
      { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: "Windows CE", r: /Windows CE/ },
      { s: "Windows 3.11", r: /Win16/ },
      { s: "Android", r: /Android/ },
      { s: "Open BSD", r: /OpenBSD/ },
      { s: "Sun OS", r: /SunOS/ },
      { s: "Chrome OS", r: /CrOS/ },
      { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
      { s: "iOS", r: /(iPhone|iPad|iPod)/ },
      { s: "Mac OS X", r: /Mac OS X/ },
      { s: "Mac OS", r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: "QNX", r: /QNX/ },
      { s: "UNIX", r: /UNIX/ },
      { s: "BeOS", r: /BeOS/ },
      { s: "OS/2", r: /OS\/2/ },
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    const nAgt = navigator.userAgent;

    for (let id in clientStrings) {
      let cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }
    if (os === null) return null;
    if (/Windows/.test(os)) {
      os = "Windows";
    }
    return os;
  };

  const currentGPU = getGPU();
  const currentOS = getOS();

  return (
    <div className="flex flex-row gap-4">
      {LinuxLogo}
      <div className="">
        <PS1 onlyHostName />
        <div className="">--------------</div>
        {currentOS !== null && <InfoLine infoKey="OS" info={currentOS} />}
        <InfoLine infoKey={"Host"} info={"annes.dev"} />
        <InfoLine
          infoKey={"Resolution"}
          info={`${window.screen.height}x${window.screen.width}`}
        />
        <InfoLine
          infoKey="CPU Threads"
          info={`${navigator.hardwareConcurrency}`}
        />
        {currentGPU !== null && <InfoLine infoKey="GPU" info={currentGPU} />}
      </div>
    </div>
  );
};

export const age = () => {
  return (
    <>
      I am currently <p className="inline-block text-cyan-300">{myAge}</p> years
      and <p className="inline-block text-cyan-300">{myAgeDays}</p> days old.
    </>
  );
};

export const cowsay = (argv: string[]) => {
  if (argv.length === 0) return <></>;
  const combinedPrompt = argv.join("");

  const MAX_CHARS_WIDTH = 40;
  const BAR_WIDTH = Math.min(combinedPrompt.length + 2, MAX_CHARS_WIDTH);
  const TOP_DELIM = "_".repeat(BAR_WIDTH) + "\n";
  const BOTTOM_DELIM = "-".repeat(BAR_WIDTH) + "\n";

  const amountOfLinesText =
    Math.floor(combinedPrompt.length / (BAR_WIDTH - 2)) +
    (combinedPrompt.length % (BAR_WIDTH - 2) > 0 ? 1 : 0);

  const getStartingColumn = (lines: number): JSX.Element[] => {
    // The starting column varies based on the amount of content lines present.
    if (lines === 1) return [<p key={"cowsay_0"}>{"<"}</p>];
    const log: JSX.Element[] = [];
    for (let i = 0; i < lines; i++) {
      if (i === 0) log.push(<p>{"/"}</p>);
      else if (i === lines - 1) log.push(<p>{"\\"}</p>);
      else log.push(<p>{"|"}</p>);
    }
    return log;
  };

  const startingColumn = getStartingColumn(amountOfLinesText);
  const getEndingColumn = (lines: number) => {
    const localStartingColumn = getStartingColumn(lines);
    if (localStartingColumn.length === 1)
      return [
        <>
          <p>{">"}</p>
        </>,
      ];
    else return localStartingColumn.reverse();
  };
  const endingColumn = getEndingColumn(amountOfLinesText);

  return (
    <div>
      <span className="ml-[1ch] block w-full whitespace-pre-wrap leading-[1rem]">
        {TOP_DELIM}
      </span>
      {/* Staring column */}
      <div className="inline-flex flex-col">
        {startingColumn.map((elem, idx) => (
          <div key={`cowsay_front_${idx}`}>{elem}</div>
        ))}
      </div>
      {/* Content */}
      <div
        className="ml-[1ch] mr-[1ch] inline-block break-all"
        // Dynamically adjust the size
        style={{ width: `${BAR_WIDTH - 2}ch`, maxWidth: `${BAR_WIDTH - 2}ch` }}
      >
        <p className="flex">{combinedPrompt}</p>
      </div>
      <div className="inline-flex flex-col">
        {endingColumn.map((elem, idx) => (
          <div key={`cowsay_end_${idx}`}>{elem}</div>
        ))}
      </div>
      <br></br>
      {/* Ending column */}
      <span className="ml-[1ch] block whitespace-pre-wrap leading-[0.4rem]">
        {BOTTOM_DELIM}
      </span>
      {cow}
    </div>
  );
};

export const clear = () => {
  return <></>;
};
