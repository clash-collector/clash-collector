import Navbar from "./Navbar";
import React from "react";

export default function View({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-100">
        <Navbar />
      </div>
      <div className="justify-center">
        <div className="p-3 mx-auto max-w-7xl pt-20">{children}</div>
      </div>
    </div>
  );
}
