import React from "react";
import bgImg from "../assets/bgimg.jpg";
import { UserMessage, BotMessage } from "../components/MessageComponents";
import botAvatar from "../assets/robot.jpg";
import userAvatar from "../assets/user.png";
import NavBar from "../components/Header";

const Chatbox = () => {
  return (
    <>
      <NavBar />
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex h-3/4 w-full max-w-4xl flex-col rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4 w-full text-center text-3xl font-semibold text-teal-700">
            ChatBot
          </div>

          <div className="mb-4 flex-1 overflow-y-auto rounded-md border border-gray-200 p-4">
            <UserMessage
              message="Hows the air quality in Bayside, Queens?"
              avatar={userAvatar}
            />
            <BotMessage
              message="The air quality in Bayside, Queens is currently Moderate with an AQI of 67. The main pollutant is PM2.5. While outdoor activities are generally safe, people with respiratory conditions should consider limiting prolonged or heavy outdoor exertion."
              botAvatar={botAvatar}
            />
            <UserMessage
              message="Hows the air quality in Ridgewood?"
              avatar={userAvatar}
            />
            <BotMessage
              message="Generating response..."
              botAvatar={botAvatar}
            />
          </div>

          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus:outline-none"
            />
            <button className="ml-3 rounded-full bg-teal-500 px-6 py-2 text-white hover:bg-teal-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbox;
