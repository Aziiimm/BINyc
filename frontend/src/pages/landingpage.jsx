import React from "react";
import backgroundImage from "../assets/backgroundImage.jpg";
import { IoMap } from "react-icons/io5";
import { AiFillEnvironment } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";

function LandingPage() {
  return (
    <div
      className="flex h-screen w-full bg-cover bg-center font-custom"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 z-0 bg-[rgb(0,32,23)] opacity-60"></div>
      <div className="w-1/2"></div>
      <div className="z-10 mt-32 flex w-1/2 max-w-fit flex-col gap-y-4 text-5xl font-bold text-white">
        <div className="flex flex-row gap-8">
          <BiWorld className="transition duration-200 ease-in-out hover:scale-105" />
          <IoMap className="transition duration-200 ease-in-out hover:scale-105" />
          <AiFillEnvironment className="transition duration-200 ease-in-out hover:scale-105" />
        </div>
        <div className="mt-10">
          <div className="flex">
            <h1 className="text-left text-white">BI</h1>
            <h1 className="text-left text-[rgb(96,147,93)]">Nyc</h1>
          </div>
          <h1 className="text-left">Map</h1>
        </div>

        <p className="mt-4 inline-block w-7/12 text-base font-normal">
          A community driven app for New Yorkers who care about the community
          and want to keep our city clean! Join our growing community of heroes
          aiming to turn NYC cleaner one report at a time. Let's keep our city
          beautiful together!
        </p>

        <a
          className="mt-12 w-fit rounded-full bg-[rgb(96,147,93)] px-6 py-4 text-sm font-normal transition-all duration-200 ease-in-out hover:scale-105 hover:bg-teal-500"
          href="/reports"
        >
          Go to Map
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
