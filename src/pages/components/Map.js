import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const Map = ({ lat, lng, houses }) => {
  const containerStyle = {
    width: "300px",
    height: "300px",
  };

  const center = {
    lat,
    lng,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });
  // Figure out what these commented things do

  //   const onLoad = React.useCallback(function callback(map) {
  //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     map.fitBounds(bounds);

  //     setMap(map)
  //   }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //     setMap(null)
  //   }, [])

  if (!isLoaded) {
    return <h2>Loading...</h2>;
  }
  console.log(houses);
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        draggableCursor: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}

      {houses &&
        houses.map((house) => {
          const houseLocation = { lat: house.latitude, lng: house.longitude };
          return <Marker position={houseLocation} />;
        })}
    </GoogleMap>
  );
};

export default Map;
