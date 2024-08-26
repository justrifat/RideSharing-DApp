'use client'

import React from "react";
import GetPay from "@/components/GetPay/GetPay";
import { useState, useEffect } from "react";
import { useRiderAddress } from "@/contexts/rider.context";

const AccepetedRide = () => {
  const { contract2, riderAddress } = useRiderAddress();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (contract2) {
      const fetchUsers = async () => {
        const users = await contract2.getBookingByRider(riderAddress);
        console.log("users",users);
        setBooking(users);
      };

      fetchUsers();
    }
  }, [contract2,riderAddress]);

  return (
    <div className="w-[720px] mx-auto py-16">
      <GetPay
      booking={booking}
      setBooking={setBooking}
      /> 
      
    </div>
  );
};

export default AccepetedRide;
