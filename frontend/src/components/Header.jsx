import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 z-10 h-16 w-full bg-[rgb(0,32,23)] p-4 text-white">
      <header className="flex h-full items-center justify-between">
        <a href="/">
          <h1 className="font-oswald text-4xl font-bold" href="">
            <span className="text-white">BI</span>
            <span className="text-[rgb(96,147,93)]">Nyc</span>
          </h1>
        </a>

        <nav className="space-x-12 text-xl font-bold text-white">
          <a href="/reports" className="hover:underline">
            Home
          </a>
          <a href="/form" className="hover:underline">
            Report Issue
          </a>
        </nav>
      </header>
    </div>
  );
};

export default Header;
