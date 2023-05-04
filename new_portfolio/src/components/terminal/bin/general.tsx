import {
  GITHUB_SOURCE_URL,
  LINKEDIN_URL,
  LinuxLogo,
  asciiAnnes,
  myAge,
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
