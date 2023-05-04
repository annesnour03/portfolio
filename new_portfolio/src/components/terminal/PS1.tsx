import React from "react";

type PS1Props = { onlyHostName?: boolean };

const PS1 = ({ onlyHostName = false }: PS1Props) => {
  return (
    <div className="inline-block font-[UbuntuMono] flex-none ">
      <span className="text-blue-400">guest</span>
      <span>@</span>
      <span className="text-green-400">annes.dev</span>
      {!onlyHostName && <span className="text-purple-400">:$ ~&nbsp;</span>}
    </div>
  );
};

export default PS1;
