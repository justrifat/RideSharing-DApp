"use client";

import React, { useState, useEffect } from "react";
import RideCard from "../../components/RideCard/RideCard";
import { useRiderAddress } from "../../contexts/rider.context";
import Loader3 from "@/components/Loader/Loader3";

const Rider = () => {
  const { contract2 } = useRiderAddress();
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);

  useEffect(() => {
    if (contract2) {
      const fetchUsers = async () => {
        const users = await contract2.getAllUsers();
        setBookingRequests(await users.map((user: any) => user));
      };

      fetchUsers();
    }
  }, [contract2]);

  useEffect(() => {
    if (bookingRequests.length > 0) {
      console.log(bookingRequests);
    }
  }, [bookingRequests]);

  return (
    <div className="flex flex-col h-[100%] gap-24">
      <h2 className="text-cream-100 py-2 font-semibold text-center text-[36px] w-[100vw] bg-blue-950 ">
        Booking Requests
      </h2>
      <div className="flex justify-center items-center h-full">
        {bookingRequests.length === 0 ? (
          <div>
            <Loader3 />
          </div>
        ) : bookingRequests.some((request) => request.name !== "") ? (
          <div className="px-12 py-4 grid grid-cols-2 gap-x-2 gap-y-2 ">
            {bookingRequests.map(
              (request) =>
                request.name !== "" && (
                  <RideCard
                    key={`${request.time}+${Math.random()}`}
                    request={request}
                    contract={contract2}
                  />
                )
            )}
          </div>
        ) : (
          <div className="font-semibold text-[32px] h-[400px]  ">No Available Requests Found</div>
        )}
      </div>
    </div>
  );
};

export default Rider;
