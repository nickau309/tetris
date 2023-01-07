import React from "react";

export default function TextDisplay({ text }) {
  return (
    <p className="rounded-full bg-gray-900/95 p-2 text-center text-gray-200">
      {text}
    </p>
  );
}
