import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import './styles/Map.css';
import { useEffect, useState } from 'react';


function Map(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [location, setLocation] = useState({lat: 0, lng: 0});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <div className="map">
      {isLoaded ? (
      <GoogleMap
        mapContainerClassName="map-container"
        zoom={8}
        center={location}
      >
        <MarkerF position={location} />
      </GoogleMap>)
      :(<h1>Loading...</h1>)}
    </div>
  );
}

export default Map;
