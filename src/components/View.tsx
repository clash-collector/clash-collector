import Navbar from "./Navbar";
import React from "react";

export default function View({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="justify-center">
        <div className="p-3 mt-20 mx-auto max-w-7xl md:mt-24 z-10">{children}</div>
      </div>
      <div className="w-100 absolute top-0 h-0">
        <Navbar />
      </div>
    </div>
  );
}
