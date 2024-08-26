"use client";
import BookForm from "@/components/BookForm/BookForm";
import CancelRequest from "@/components/CancelRequest/CancelRequest";
import React from "react";
import { useEffect, useState } from "react";
import { useUserAddress } from "@/contexts/user.context";

const Page = () => {
  const { contract1, userAddress } = useUserAddress();
  const [bookingRequest, setBookingRequest] = useState<any>(null);

  useEffect(() => {
    if (contract1) {
      const fetchUsers = async () => {
        const users = await contract1.getAllUsers();

        await users.map((user: any) => {
          if (user.metamaskID === userAddress) {
            setBookingRequest(user);
          }
        });
      };

      fetchUsers();
    }
  }, [contract1, userAddress]);

  return (
    <div className="flex justify-center items-center mt-12 gap-4">
      {bookingRequest == null ? <BookForm /> : <CancelRequest />}
    </div>
  );
};

export default Page;
