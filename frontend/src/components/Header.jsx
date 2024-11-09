import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 z-10 w-full bg-teal-600 p-4 text-white">
      <header className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Queens Air Quality Map</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/chat" className="hover:underline">
            AI Chat
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
