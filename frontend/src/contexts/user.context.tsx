import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { ethers } from "ethers";
import abi from "../constants/abi.json";
import { constants } from "@/constants/constants";

// 1. Create a new context
const UserAddressContext = createContext<{
  userAddress: string;
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  provider1: any;
  contract1: any;
  signer: any;
  setSigner: React.Dispatch<React.SetStateAction<any>>;
  location: { lat: number; lng: number };
  setLocation: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  destination: { lat: number; lng: number };
  setDestination: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }>
  >;
  distance: string;
  setDistance: React.Dispatch<React.SetStateAction<string>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  originRef: React.MutableRefObject<HTMLInputElement | null>;
  destiantionRef: React.MutableRefObject<HTMLInputElement | null>;
  directionsResponse: any;
  setDirectionsResponse: React.Dispatch<React.SetStateAction<any>>;
  locationString: string;
  setLocationString: React.Dispatch<React.SetStateAction<string>>;
  destinationString: string;
  setDestinationString: React.Dispatch<React.SetStateAction<string>>;
}>({
  userAddress: "",
  setUserAddress: () => {},
  provider1: null,
  contract1: null,
  location: { lat: 22.356184, lng: 91.819006 },
  setLocation: () => {},
  destination: { lat: 0, lng: 0 },
  setDestination: () => {},
  distance: "",
  setDistance: () => {},
  duration: "",
  setDuration: () => {},
  originRef: { current: null },
  destiantionRef: { current: null },
  directionsResponse: null,
  setDirectionsResponse: () => {},
  locationString: "",
  setLocationString: () => {},
  destinationString: "",
  setDestinationString: () => {},
  signer: null,
  setSigner: () => {},
});

// 2. Define a provider component
export const UserAddressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userAddress, setUserAddress] = useState<string>("");
  const [provider1, setProvider] = useState<any>();
  const [contract1, setContract] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [location, setLocation] = useState({
    lat: 22.356184,
    lng: 91.819006,
  });
  const [destination, setDestination] = useState({
    lat: 0,
    lng: 0,
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [locationString, setLocationString] = useState("");
  const [destinationString, setDestinationString] = useState("");

  const originRef = useRef<HTMLInputElement | null>(null);
  const destiantionRef = useRef<HTMLInputElement | null>(null);

  // Update locationString whenever originRef.current.value changes
  useEffect(() => {
    if (originRef.current) {
      setLocationString(originRef.current.value);
    }
  }, [originRef.current?.value]);

  // Update destinationString whenever destiantionRef.current.value changes
  useEffect(() => {
    if (destiantionRef.current) {
      setDestinationString(destiantionRef.current.value);
    }
  }, [destiantionRef.current?.value]);

  useEffect(() => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    
    const web3 = async () => {
      if (provider) {
        (window as any).ethereum.on("accountsChanges", () => {
          (window as any).location.reload();
        });

        const signer = await provider.getSigner();
        // const signer1 = new ethers.Wallet(
        //   constants.SIGNER_PRIVATE_KEY,
        //   provider
        // );
        setSigner(signer);
        const address = await signer.getAddress();

        setUserAddress(address);

        const contractAddress = constants.smartContractAddress;
        const contract = new ethers.Contract(contractAddress, abi.abi, signer);

        console.log(contract);
        console.log(provider);

        setContract(contract);
        setProvider(provider);
      }
    };

    provider && web3();
  }, []);

  return (
    <UserAddressContext.Provider
      value={{
        userAddress,
        setUserAddress,
        provider1,
        contract1,
        location,
        setLocation,
        destination,
        setDestination,
        distance,
        setDistance,
        duration,
        setDuration,
        originRef,
        destiantionRef,
        directionsResponse,
        setDirectionsResponse,
        locationString,
        setLocationString,
        destinationString,
        setDestinationString,
        signer,
        setSigner,
      }}
    >
      {children}
    </UserAddressContext.Provider>
  );
};

export const useUserAddress = () => useContext(UserAddressContext);
