import Navbar from "./Navbar";
import React from "react";

export default function View({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-100">
        <Navbar />
      </div>
      <div className="justify-center">
        <div className="p-3 pt-20 mx-auto max-w-7xl md:pt-3">{children}</div>
      </div>
    </div>
  );
}
