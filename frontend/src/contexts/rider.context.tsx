import React, { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json";
import { constants } from "../constants/constants";

// 1. Create a new context
const RiderAddressContext = createContext<{
  riderAddress: string;
  setRiderAddress: React.Dispatch<React.SetStateAction<string>>;
  provider2: any;
  contract2: any;
  bookingRequests: any[];
  setBookingRequests: React.Dispatch<React.SetStateAction<any[]>>;
}>({
  riderAddress: "",
  setRiderAddress: () => {},
  provider2: null,
  contract2: null,
  bookingRequests: [],
  setBookingRequests: () => {},
});

// 2. Define a provider component
export const RiderAddressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [riderAddress, setRiderAddress] = useState<string>("");
  const [cutomerAddress, setCustomerAddress] = useState<string>("");
  const [provider2, setProvider2] = useState<any>();
  const [contract2, setContract2] = useState<any>();
  //array type state inside objects
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);

  useEffect(() => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const web32 = async () => {
      if (provider) {
        (window as any).ethereum.on("accountsChanges", () => {
          (window as any).location.reload();
        });

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setRiderAddress(address);

        const contractAddress = constants.smartContractAddress;
        const contract = new ethers.Contract(contractAddress, abi.abi, signer);

        console.log(contract);
        console.log(provider);

        setContract2(contract);
        setProvider2(provider);
      }
    };

    provider && web32();
  }, []);

  useEffect(() => {
    if (bookingRequests.length > 0) {
      console.log("bookingRequests", bookingRequests);
      // other code that depends on bookingRequests
    }
  }, [bookingRequests]);

  return (
    <RiderAddressContext.Provider
      value={{
        riderAddress,

        setRiderAddress,
        provider2,
        contract2,
        bookingRequests,
        setBookingRequests,
      }}
    >
      {children}
    </RiderAddressContext.Provider>
  );
};
export const useRiderAddress = () => useContext(RiderAddressContext);
