import { StarsCanvas } from "components";
import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "./HomePage";

type ErrorProps = {};

export const ErrorPage = (props: ErrorProps) => {
  return (
    <div className="h-screen max-h-screen w-full text-white">
      <StarsCanvas color="#b3071f" />
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="animation-404 text-[20rem]">404</h1>
        <h3 className="text-4xl">
          Whoopsies! Nothing here, better luck next time.
        </h3>
        <Link className="text-2xl text-blue-500" to="/">
          Go back
        </Link>
        <div className="mt-32">
          <Footer />
        </div>
      </div>
    </div>
  );
};
