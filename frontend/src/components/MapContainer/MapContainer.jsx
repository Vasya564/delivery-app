import { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '350px'
};

const center = {
  lat: 49.842846,
  lng:  24.027339
};

const libraries = ["places"];

const MapContainer = ({ selectedAddress, setIsMapLoaded, shopCoords, shopName }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries,
  });
  const [mapRef, setMapRef] = useState();
  const onMapLoad = (map) => {
    setMapRef(map);
  };

  useEffect(() => {
    if (selectedAddress && mapRef) {
        const { lat, lng } = selectedAddress;
        const location = { lat, lng };
        mapRef.panTo(location);
    }
  }, [selectedAddress]);

  useEffect(() => {
    setIsMapLoaded(isLoaded);
  }, [isLoaded, setIsMapLoaded]);

  return isLoaded ? (
    <>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onMapLoad}
    >
      {isLoaded && selectedAddress && <MarkerF position={selectedAddress} />}
      {isLoaded && shopCoords && 
        <MarkerF position={shopCoords}>
            {shopName &&
            <InfoWindowF position={shopCoords}>
                <p>{shopName}</p>
            </InfoWindowF>}
        </MarkerF>}
    </GoogleMap>
    </>
  ) : (
    <div>Loading Google Maps API...</div>
  );
};

export default MapContainer;