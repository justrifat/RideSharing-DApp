import React from "react";

const Text = ({ text, value }: { text: string; value: any }) => {
  return (
    <div className="flex gap-12 items-center justify-between ">
      <p className="text-sm text-blue-950 font-medium"> {text}:</p>
      <p className="bg-cream-50 px-4 py-4 rounded-xl text-sm  max-w-[540px]">{value}</p>
    </div>
  );
};

export default Text;
