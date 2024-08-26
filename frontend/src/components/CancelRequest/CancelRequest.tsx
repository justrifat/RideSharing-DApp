import { useUserAddress } from "@/contexts/user.context";
import React from "react";
import { useEffect, useState } from "react";
import Text from "../Text/Text";
import { weiToTaka } from "@/constants/constants";

const CancelRequest = () => {
  const { contract1, userAddress } = useUserAddress();
  const [bookingRequest, setBookingRequest] = useState<any>(null);
  const [cancelling, setCancelling] = useState(false);

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

  if (bookingRequest != null) {
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
    } = bookingRequest;

    const handleCancel = async () => {
      try {
        setCancelling(true);
        await contract1.deleteUser(metamaskID);
        setCancelling(false);

        alert("Ride Cancelled");
        // await (window as any).location.reload();
      } catch (error) {
        alert(error);
      } finally {
        setCancelling(false);
      }
    };

    return (
      <div className="bg-cream-100 px-6 py-4 flex flex-col rounded-xl gap-2 ">
        <div className="flex flex-col gap-4 px-4 ">
            <h1 className="text-[26px] font-semibold text-center ">Existing Request</h1>
          <Text text="Metamask Id" value={metamaskID} />
          <div></div>
          <Text text="Location" value={location} />
          <Text text="Destination" value={destination} />
          <Text text="Fare" value={String(weiToTaka(fare))} />
        </div>
        <div className="flex justify-center items-center gap-12">
          <button className=" bg-red-600 text-cream-100 button" onClick={handleCancel}>
            {cancelling ? "Cancelling..." : "Cancel"}
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CancelRequest;
