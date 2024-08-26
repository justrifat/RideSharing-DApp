'use client';

import LNav from "@/components/Nav/LNav";
import UNavR from "@/components/Nav/UNavR";
import React from "react";
import { RiderAddressProvider } from "@/contexts/rider.context";

const Rider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <RiderAddressProvider>
      <section>
        <UNavR
          role="Driver"
        />
        <LNav
          text1="Availabe Rides"
          text2="Accepted Rides"
          text3="See Route"
          link1="/rider"
          link2="/rider/accepted-ride"
          link3="/rider/maps"
        />
        {children}
      </section>
    </RiderAddressProvider>
  );
};

export default Rider;
