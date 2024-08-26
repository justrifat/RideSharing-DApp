import { parseEther, formatEther } from "ethers";

export const constants = {
  smartContractAddress: "0x0A0584cb04f1Ea291b67459Cf6D01c15806f6D3c",
  GoogleMapsApiKey: "AIzaSyDm3Ap2iSO4KnM1UcnwVsNZLsuLxZGeM94",
  MapID: "471d066c5b3b756e",

  // ETHEREUM_NETWORK: "sepolia",
  // INFURA_API_KEY: "GCPmtsi8w3qRktbITbQQHDCJbZ9xi746XXhTfAKxZJPrAwbiE3A1eQ",
  // INFURA_PROJECT_ID: " 9b3bfed8dcc341eb858ee1dbf0166c7f",
  // SIGNER_PRIVATE_KEY:
  //   "6fae49d3131efce9c094173d7aa6ca88ff73374346f86f1ad0a6c558f2e19992",
};
type BigNumberish = string | number | bigint;

export const takaToWei = (amountInTaka: number): BigNumberish => {
  // Step 1: Convert Taka to US Dollars
  const amountInUSD = amountInTaka / 117;
  // Step 2: Convert US Dollars to Ether
  const amountInEther = amountInUSD / 28955;
  // Step 3: Convert Ether to Wei
  const amountInWei = parseEther(amountInEther.toFixed(18));
  return amountInWei;
};

// takaToWei(2500);

export const weiToTaka = (amountInWei: BigNumberish): number => {
  // Step 1: Convert Wei to Ether
  const amountInEther = parseFloat(
    parseFloat(formatEther(amountInWei)).toFixed(18)
  );

  // Step 2: Convert Ether to US Dollars
  const amountInUSD = parseFloat((amountInEther * 28955).toFixed(2));

  // Step 3: Convert US Dollars to Taka
  const amountInTaka = parseFloat((amountInUSD * 117).toFixed(2));

  return amountInTaka;
};

export const increaseBy30Percent = (value: bigint): bigint => {
  // Calculate 30% of the value
  const thirtyPercent: bigint = (value * BigInt(30)) / BigInt(100);

  // Add 30% to the original value
  const increasedValue: bigint = value + thirtyPercent;

  return increasedValue;
};
