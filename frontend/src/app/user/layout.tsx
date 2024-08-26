"use client";

import LNav from "@/components/Nav/LNav";
import UNav from "@/components/Nav/UNav";
import React, { useEffect } from "react";
import { UserAddressProvider } from "@/contexts/user.context";

const User = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <UserAddressProvider>
      <section className="bg-gray-950 h-screen">
        <div className="h-[130px]">
          <UNav role="Rider" />
          <LNav
            text1="Book A Ride"
            text2="Pay For The Ride"
            text3="Choose Destination"
            link1="/user"
            link2="/user/pay"
            link3="/user/maps"
          />
        </div>

        {children}
      </section>
    </UserAddressProvider>
  );
};

export default User;
