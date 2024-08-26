import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Text from "../Text/Text";
import { useRiderAddress } from "@/contexts/rider.context";
import { weiToTaka } from "@/constants/constants";


const GetPay = ({ booking, setBooking }: { booking: any; setBooking: any }) => {
  const { contract2, riderAddress } = useRiderAddress();
  const [requesting, setRequesting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      await contract2.deleteBooking(booking.metamaskID);
      setCancelling(false);
      setBooking(null);
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (error) {
      alert(error);
    } finally {
      setBooking(null);
      setCancelling(false);
    }
  };

  const handlePaymentRequest = async () => {
    try {
      setRequesting(true);
      await contract2.requestPayment(booking.metamaskID);
      setRequesting(false);
    } catch (error) {
      alert(error);
    } finally {
      setRequesting(false);
    }
  };

  return booking === null ? (
    <div className="flex justify-center items-center h-[450px] text-[32px] font-semibold text-cream-800 ">Nothing to show</div>
  ) : (
    <Card className="border-none bg-cream-100 rounded-xl px-4 py-6">
      <CardHeader className="text-center text-xl font-semibold text-blue-950">
        Accepted Ride
      </CardHeader>
      <CardContent className="text-lg grid grid-cols-2 gap-y-3 gap-x-4 mt-4">
      <Text text="Rider Account" value={booking?.metamaskID} />
      <div></div>
        <Text text="Fare" value={String(weiToTaka(booking?.fare))} />
        
        <Text text="Name" value={booking?.name} />
        <Text text="Email" value={booking?.email} />
        <Text text="Location" value={booking?.location} />
        <Text text="Destination" value={booking?.destination} />
        <Text text="Number" value={booking?.number} />

      </CardContent>
      <CardFooter className="flex justify-center items-center mt-4 gap-8">
        <button className="button " onClick={handlePaymentRequest}>
          {requesting === true ? "Requesting..." : "Request Payment"}
        </button>
        {/* <button
          className=" bg-red-600 text-cream-100 button"
          onClick={handleCancel}
        >
          {cancelling === true ? "Cancelling..." : "Cancel Ride"}
        </button> */}
      </CardFooter>
    </Card>
  );
};

export default GetPay;
