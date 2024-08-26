'use client'

import PayNow from "@/components/PayNow/PayNow";
import React from "react";
import { useUserAddress } from "@/contexts/user.context";
import { useState,useEffect } from "react";


const Pay = () => {
  const { contract1, userAddress } = useUserAddress();
  const [booking2, setBooking2] = useState(null);

  useEffect(() => {
    if (contract1) {
      const fetchUsers = async () => {
        const users = await contract1.getBookingByUser(userAddress);
        console.log("users", users);
        setBooking2(users);
      };

      fetchUsers();
    }
  }, [contract1, userAddress]);
  return (
    <div className="max-w-[1150px] m-auto mt-12">
      <PayNow
        booking2={booking2}
        setBooking2={setBooking2}
      />
    </div>
  );
};

export default Pay;
