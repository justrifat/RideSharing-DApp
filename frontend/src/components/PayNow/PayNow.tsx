"use client";
import React, { useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Text from "../Text/Text";
import { useState } from "react";
import { useUserAddress } from "@/contexts/user.context";
import { constants, weiToTaka } from "@/constants/constants";
import { ethers } from "ethers";
const increaseBy30Percent = (value: bigint): bigint => {
  // Calculate 30% of the value
  const thirtyPercent: bigint = (value * BigInt(30)) / BigInt(100);

  // Add 30% to the original value
  const increasedValue: bigint = value + thirtyPercent;

  return increasedValue;
};

const PayNow = ({
  booking2,
  setBooking2,
}: {
  booking2: any;
  setBooking2: any;
}) => {
  const { contract1, provider1, signer } = useUserAddress();
  const [paying, setPaying] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handlePayment = async () => {
    try {
      setPaying(true);
      await provider1.send("eth_requestAccounts", []);
      if (!(window as any).ethereum)
        throw new Error("No crypto wallet found. Please install it.");
      await (window as any).ethereum.send("eth_requestAccounts");

      const tx = await signer.sendTransaction({
        to: booking2.RidermetaID,
        value: booking2.fare,
      });

      // Waiting for the transaction to be mined
      const receipt = await tx.wait();
      // The transaction is now on chain!
      console.log(receipt);

      await contract1.deleteBooking(booking2.RidermetaID);

      setPaying(false);
      await setBooking2(null);
      alert("Payment Successful");
      // await (window as any).location.reload();
    } catch (error) {
      alert(error);
      console.log("Error", error);
    } finally {
      setPaying(false);
    }
  };

  const handleCancel = async () => {
    try {
      setCancelling(true);
      await contract1.deleteBooking(booking2.metamaskID);
      setCancelling(false);
      await setBooking2(null);
      await alert("Ride Cancelled");
      // await (window as any).location.reload();
    } catch (error) {
      alert(error);
    } finally {
      setCancelling(false);
    }
  };

  return booking2 === null ? (
    <div className="font-semibold text-[36px] text-cream-100 h-[450px] flex justify-center items-center ">No Rider accepted request or no request created</div>
  ) : (
    <Card className="border-none bg-cream-100 rounded-xl px-24 py-12">
      <CardHeader className="text-center text-3xl font-semibold text-blue-950">
        Pay For Your Ride
      </CardHeader>
      <CardContent className="text-lg flex flex-col gap-8 mt-12">
        <Text text="Fare" value={String(weiToTaka(booking2?.fare))} />
        <Text text="Driver Account" value={booking2.RidermetaID} />
      </CardContent>
      <CardFooter className="flex justify-center items-center mt-12 gap-8">
        <button className="button " onClick={handlePayment}>
          {paying ? "Paying..." : "Pay Now"}
        </button>

        <button
          className="bg-red-600 text-cream-100 button"
          onClick={handleCancel}
        >
          {cancelling ? "Cancelling..." : "Cancel Ride"}
        </button>
      </CardFooter>
    </Card>
  );
};

export default PayNow;
