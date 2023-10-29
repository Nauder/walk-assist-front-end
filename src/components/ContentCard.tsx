import React from "react";

export default function ContentCard(props: { children: React.ReactNode; }) {
  return (
    <div
      className="w-8/12 rounded-lg shadow border md:mt-0 xl:p-0 bg-gray-800 border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        {props.children}
      </div>
    </div>
  )
}