"use client";
import React from "react";
import { Button } from "../ui/button";
import PlacesSearchOrigin from "./PlaceSearchOrigin";
import PlacesSearchDestination from "./PlaceSearchDestination";
import { useUserAddress } from "@/contexts/user.context";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Mapform = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    duration,
    distance,
    setDirectionsResponse,
    setDuration,
    setDistance,
    originRef,
    destiantionRef,
  } = useUserAddress();

  async function calculateRoute(e: any) {
    e.preventDefault();
    // eslint-disable-next-line
    if (
      !originRef.current ||
      !destiantionRef.current ||
      originRef.current.value === "" ||
      destiantionRef.current.value === ""
    ) {
      return;
    }
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    // eslint-disable-next-line
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (results.routes.length > 0 && results.routes[0].legs.length > 0) {
      const firstLeg = results.routes[0].legs[0];
      if (firstLeg.distance && firstLeg.duration) {
        setDirectionsResponse(results);
        console.log(results);
        setDistance(firstLeg.distance.text);
        setDuration(firstLeg.duration.text);
      }
    }
  }

  function clearRoute(e: any) {
    e.preventDefault();
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (
      !originRef.current ||
      !destiantionRef.current ||
      originRef.current.value === "" ||
      destiantionRef.current.value === ""
    ) {
      return;
    }
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  function handleNextStep(e: any) {
    e.preventDefault();
    if (distance === "" || duration === "") {
      toast({
        variant: "destructive",
        title: "Please calculate the route first.",
        description: "You need to calculate the route first before proceeding.",
      });
      return;
    }
    router.push("/user");
  }

  return (
    <div className="bg-bgdark h-[calc(100vh-130px)]  ">
      <form className="flex flex-col h-full justify-center  gap-4 items-center ">
        <PlacesSearchOrigin />
        <PlacesSearchDestination />
        {distance !== "" && duration !== "" && (
          <div className="flex flex-col gap-3 bg-cream-300 text-blue-950 p-2 rounded">
            <p className="bg-cream-400 rounded py-2 text-center font-semibold">
              Distance: <span className="font-bold">{distance}</span>
            </p>
            <p className="bg-cream-400 rounded py-2 text-center font-semibold">
              Estimated Duration: <span className="font-bold">{duration}</span>
            </p>
          </div>
        )}
        <div className="text-bgdark flex gap-2 font-bold">
          <Button
            className="bg-cream-400 rounded-xl hover:border hover:border-cream-400 hover:text-cream-400"
            onClick={calculateRoute}
          >
            Calculate Route
          </Button>
          <Button
            className="bg-cream-400 rounded-xl hover:border hover:border-cream-400 hover:text-cream-400 "
            onClick={clearRoute}
          >
            Clear Route
          </Button>
        </div>
        <Button
          className="bg-cream-900 rounded-xl text-cream-200 text-md p-6 hover:bg-bgdark hover:text-cream-600 hover:border hover:border-x-2 hover:border-y-2 hover:border-cream-600  transition-all duration-100 ease-in-out"
          onClick={handleNextStep}
        >
          Next Step
        </Button>
      </form>
    </div>
  );
};

export default Mapform;
