import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";

interface HeroProps {
  image?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
  backLink?: {
    uri: string;
    tooltip: string;
  };
}

export default function Hero({ image, title, content, backLink }: HeroProps) {
  return (
    <div className="flex flex-col align-center text-center p-5 bg-base-200 rounded-2xl max-w-4xl mx-auto shadow-xl">
      {backLink && (
        <div className="tooltip absolute" data-tip={backLink.tooltip}>
          <Link to={backLink.uri}>
            <button className="btn btn-outline my-auto">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          </Link>
        </div>
      )}
      {image}
      {title && <span className="text-2xl font-bold text-center">{title}</span>}
      {content && <div className="flex flex-col text-center">{content}</div>}
    </div>
  );
}
