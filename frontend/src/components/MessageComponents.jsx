import React from "react";

const UserMessage = ({ message, avatar }) => (
  <div className="flex items-start">
    <img
      src={avatar}
      alt="User Avatar"
      className="mr-3 h-10 w-10 rounded-full bg-black"
    />
    <div className="mb-4 rounded-xl bg-gray-100 p-4 text-gray-800 shadow-sm">
      {message}
    </div>
  </div>
);

const BotMessage = ({ message, botAvatar }) => (
  <div className="flex items-start justify-end">
    <div className="mb-4 rounded-xl bg-gray-100 p-4 text-gray-800 shadow-sm">
      {message}
    </div>
    <img
      src={botAvatar}
      alt="Bot Avatar"
      className="ml-3 h-10 w-10 rounded-full bg-black"
    />
  </div>
);

export { UserMessage, BotMessage };
