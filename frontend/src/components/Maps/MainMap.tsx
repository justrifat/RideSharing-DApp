"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
  DirectionsRenderer,
  DirectionsService,
} from "@react-google-maps/api";
import { constants } from "@/constants/constants";
import { useUserAddress } from "@/contexts/user.context";
import Loader from "../Loader/Loader";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  mapId: constants.MapID,
  mapTypeControl: true,
  zoomControl: true,
  fullscreenControl: false,
  clickableIcons: false,
  scrollWheel: true,
  streetViewControl: false,
};

export default function MainMap() {
  const {
    location,
    setLocation,
    destination,
    setDestination,
    directionsResponse,
  } = useUserAddress();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: constants.GoogleMapsApiKey,
  });
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);
  const [infoWindowDestination, setInfoWindowDestination] =
    React.useState(false);

  const locationClicked = (e: any) => {
    setIsInfoOpen(!isInfoOpen);
  };
  const locationDragged = (e: any) => {
    console.log("Dragged", e.latLng.lat(), e.latLng.lng());
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };
  const destinationClicked = (e: any) => {
    setInfoWindowDestination(!infoWindowDestination);
    console.log("Clicked", e.latLng.lat(), e.latLng.lng());
    // setUserAddress({
    //   lat: e.latLng.lat(),
    //   lng: e.latLng.lng(),
    // });
  };
  const destinationDragged = (e: any) => {
    console.log("Dragged", e.latLng.lat(), e.latLng.lng());
    setDestination({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={location}
      zoom={14}
      options={options}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {location && (
        <MarkerF
          position={{
            lat: location.lat,
            lng: location.lng,
          }}
          onClick={locationClicked}
          onDragEnd={locationDragged}
          draggable={true}
        >
          {isInfoOpen && (
            <InfoWindowF position={location}>
              <div className="mb-2 space-x-12">
                <h1>{`Current Location: ${location.lat} ${location.lng}`}</h1>
                <p></p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      )}
      {destination && (
        <MarkerF
          position={destination}
          onClick={destinationClicked}
          onDragEnd={destinationDragged}
          draggable={true}
        >
          {infoWindowDestination && (
            <InfoWindowF position={location}>
              <div className="mb-2 space-x-12">
                <h1>{`Destination Location: ${destination.lat} ${destination.lng}`}</h1>
                <p></p>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      )}

      {directionsResponse && (
        <DirectionsRenderer directions={directionsResponse} />
      )}
    </GoogleMap>
  ) : (
    <div className="flex h-full text-white font-bold justify-center items-center  bg-bgdark">
      <Loader />
    </div>
  );
}
