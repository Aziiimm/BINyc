import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h1>Queens Air Quality Map</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/chat">AI Chat</a>
      </nav>
    </header>
  );
};

export default Header;