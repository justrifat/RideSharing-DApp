import React from "react";
import MainMap from "@/components/Maps/MainMap";
import Mapform from "@/components/MapForm/Mapform";

const Page = () => {
  return (
    <div className="flex ">
      <div className="w-1/5">
        <Mapform />
      </div>
      <div className="w-4/5">
        <MainMap />
      </div>
    </div>
  );
};

export default Page;
