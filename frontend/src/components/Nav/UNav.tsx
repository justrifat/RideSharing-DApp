"use client";
import React from "react";
import { useUserAddress } from "@/contexts/user.context";
import Link from "next/link";

const UNav = ({ role = "User" }: { role: string }) => {
  const { userAddress } = useUserAddress();
  return (
    <nav className="w-full h-20 flex justify-between bg-blue-950 px-4 items-center">
       <p className="h-16 px-4 py-4 rounded-md font-bold text-cream-400 text-3xl ml-12">
        <Link href="/">Home</Link>
      </p>
      <p className="h-16 px-4 py-4 rounded-md font-bold text-cream-400 text-3xl ml-12">
        {role}
      </p>
      <p className="bg-blue-100 px-4 py-4 text-blue-900 rounded-xl font-semibold">
        {userAddress}
      </p>
    </nav>
  );
};

export default UNav;
