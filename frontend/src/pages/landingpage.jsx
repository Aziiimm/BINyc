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
      <div className="absolute inset-0 z-0 bg-[rgb(0,128,128)] opacity-60"></div>
      <div className="w-1/2"></div>
      <div className="z-10 mt-32 flex w-1/2 max-w-fit flex-col gap-y-4 text-5xl font-bold text-white">
        <div className="flex flex-row gap-8">
          <BiWorld className="hover:scale-105" />
          <IoMap className="hover:scale-105" />
          <AiFillEnvironment className="hover:scale-105" />
        </div>
        <div className="mt-10">
          <h1 className="text-left">Queens</h1>
          <h1 className="text-left">Air Quality</h1>
          <h1 className="text-left">Map</h1>
        </div>

        <p className="mt-4 inline-block w-7/12 text-base font-normal">
          Queen Air Quality Map is made for everyone. Easily check the air
          quality in Queens with simple, real-time updates. Accessible, clear,
          and designed to keep you informed and healthy.
        </p>

        <a
          className="mt-12 w-fit rounded-full bg-[rgb(37,218,197)] px-6 py-4 text-sm font-normal transition-all duration-200 hover:scale-105 hover:bg-teal-500"
          href="/map"
        >
          Go to Map
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
