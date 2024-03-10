import { useState, useEffect } from "react";
import { AutoCompleteAddress } from ".";
import MapGL, { Marker } from "react-map-gl";
import { MAPBOX_TOKEN } from "../config-global";

const LocationContainer = ({ fullAddress, latitude, longitude }) => {
  const [address, setAddress] = useState({
    fullAddress: fullAddress || "",
    place: "", // city in map-box api
    country: "il",
    latitude: latitude || "",
    longitude: longitude || "",
  });

  const updateCoordinates = (latitude, longitude) => {
    setAddress({ ...address, latitude, longitude });
  };

  const [viewport, setViewport] = useState({
    latitude: address.latitude,
    longitude: address.longitude,
    zoom: 16,
  });

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude: address.latitude,
      longitude: address.longitude,
    }));
  }, [address]);

  const handleMarkerDrag = (e) => {
    const latitude = e.lngLat.lat;
    const longitude = e.lngLat.lng;

    updateCoordinates(latitude, longitude);
  };

  return (
    <>
      <AutoCompleteAddress
        setAddress={setAddress}
        placeName={address.fullAddress}
      />

      <input type="hidden" name="latitude" value={address.latitude} readOnly />
      <input
        type="hidden"
        name="longitude"
        value={address.longitude}
        readOnly
      />

      {address.longitude && address.latitude && (
        <div className="map">
          <MapGL
            {...viewport}
            mapboxAccessToken={MAPBOX_TOKEN}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            onMove={(e) => {
              setViewport(e.viewState);
            }}
          >
            <Marker
              latitude={address.latitude}
              longitude={address.longitude}
              anchor="bottom"
              color="#2771e0"
              draggable={true}
              onDragEnd={handleMarkerDrag}
            />
          </MapGL>
        </div>
      )}
    </>
  );
};

export default LocationContainer;
