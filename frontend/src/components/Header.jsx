import React from 'react';

const Header = () => {
  return (
    <div className="bg-teal-600 text-white p-4 fixed top-0 w-full z-10">
      <header className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Queens Air Quality Map</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/chat" className="hover:underline">AI Chat</a>
        </nav>
      </header>
    </div>
  );
};

export default Header;


