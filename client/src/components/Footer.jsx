// import React, { useState, useEffect } from "react";

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 w-full text-center text-violet-200 text-sm p-3 bg-violet-900">
      &copy; {year} Copyright{" "}
      <a className="text-cyan-200" href="https://github.com/afif-dev" target="_blank" rel="noreferrer">
        Afif Dev
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mx-1 align-top" viewBox="0 0 20 20" fill="currentColor">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
        </svg>
      </a>
    </footer>
  );
}

export default Footer;
