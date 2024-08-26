"use client";

import React from "react";
import Text from "../Text/Text";
import { useRiderAddress } from "@/contexts/rider.context";
import { weiToTaka } from "@/constants/constants";

const RideCard = ({ contract, request }: { contract: any; request: any }) => {
  const { riderAddress, contract2 } = useRiderAddress();
  const [accepting, setAccepting] = React.useState(false);
  const {
    metamaskID,
    name,
    email,
    location,
    destination,
    fare,
    date,
    time,
    number,
  } = request;

  const handleAccept = async () => {
    try {
      setAccepting(true);
      await contract2.Booking(
        metamaskID,
        name,
        email,
        number,
        fare,
        location,
        destination,
        riderAddress,
        false,
        false
      );
      await contract2.deleteUser(metamaskID);
      setAccepting(false);
      //reload page
      setTimeout(() => {
        (window as any).location.reload();
      }, 2000);
    } catch (error) {
      alert(error);
    } finally {
      setAccepting(false);
    }
  };

  return (
    <div className="bg-cream-100 px-6 py-4 flex flex-col rounded-xl gap-2 ">
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 px-4 ">
        <Text text="Metamask Id" value={metamaskID} />
        <div></div>
        <Text text="Name" value={name} />
        <Text text="Email" value={email} />

        <Text text="Location" value={location} />
        <Text text="Destination" value={destination} />
        <Text text="Fare" value={String(weiToTaka(fare))} />
        <Text text="Date" value={`${date} ${time}`} />
        <Text text="Phone" value={number} />
      </div>
      <div className="flex justify-center items-center gap-12">
        <button className="button" onClick={handleAccept}>
          {accepting ? "Accepting..." : "Accept"}
        </button>
      </div>
    </div>
  );
};

export default RideCard;
