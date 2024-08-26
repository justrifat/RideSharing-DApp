import { useUserAddress } from "@/contexts/user.context";
import { useState, useEffect } from "react";
import React from "react";
import { takaToWei } from "@/constants/constants";
import { calculateFare } from "@/lib/function";
import Loader from "../Loader/Loader";
import Loader2 from "../Loader/Loader2";

const BookForm = () => {
  const { contract1, userAddress, originRef, destiantionRef, distance,locationString,destinationString } =
    useUserAddress();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [fare, setFare] = useState<bigint>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contract1.addUser(
        userAddress,
        name,
        email,
        phone,
        takaToWei(calculateFare(distance)),
        locationString,
        destinationString,
        new Date().toLocaleDateString(),
        new Date().toLocaleTimeString()
      );
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <form
      className="rounded-3xl py-12 px-16 bg-cream-100 flex flex-col items-center gap-6"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-4">
        <div className="form-group">
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            className="inField"
            id="name"
            name="name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="inField"
            id="email"
            name="email"
            required
            placeholder="example@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="phone">
            Phone
          </label>
          <input
            type="text"
            className="inField"
            id="phone"
            name="phone"
            required
            placeholder="8801xxxxxxxxx"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="fare">
            Fare
          </label>
          <p className="inField py-3">{calculateFare(distance)} Tk</p>
          {/* <input
            type="number"
            className="inField"
            id="fare"
            onChange={(e) => {
              setFare(takaToWei(Number(e.target.value)));
            }}
            value={calculateFare(distance)}
            name="fare"
            disabled
          /> */}
        </div>
        <div className="form-group">
          <label className="label" htmlFor="location">
            Location
          </label>
          <p className="inField py-3">{locationString} </p>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="destination">
            Destination
          </label>
          
          <p className="inField py-3">{destinationString} </p>
        </div>
      </div>

      <button type="submit" className="button">
        {loading ? <Loader2 /> : "Book"}
      </button>
      {/* <Loader2/> */}
    </form>
  );
};

export default BookForm;
