import React from "react";
import { FaHistory } from "react-icons/fa";
import { PiNotebook } from "react-icons/pi";
import { Link } from "react-router-dom";

export const Overview = () => {
  return (
    <div className="ml-auto mr-auto flex h-full w-3/4 flex-col items-center justify-center gap-24 p-10 text-white sm:flex-row max-w-3xl">
      <Link
        to="/klaver/history"
        className="inline-flex flex-1 cursor-pointer flex-col items-center justify-center gap-5 p-5 hover:text-cyan-200"
      >
        <FaHistory size="100%" className="h-auto" />
        <p className="text-2xl">History</p>
      </Link>
      <Link
        to="/klaver/play"
        className="inline-flex h-auto flex-1 cursor-pointer flex-col items-center justify-center gap-5 p-5 hover:text-cyan-200"
      >
        <PiNotebook size="100%" className="h-auto" />
        <p className="text-2xl">Start</p>
      </Link>
    </div>
  );
};
