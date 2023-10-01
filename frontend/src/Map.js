import { GoogleMap, Marker, useLoadScript, useJsApiLoader } from "@react-google-maps/api";
import './styles/Map.css';
import { useEffect, useState } from 'react';



const google = window.google;

function Map(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [location, setLocation] = useState({lat: 0, lng: 0});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }, () => {console.log(location)});
    });
  }, []);

  return (
    <div className="map">
      {isLoaded ? (
      <GoogleMap
        mapContainerClassName="map-container"
        zoom={8}
        center={location}
      ></GoogleMap>)
      :(<h1>Loading...</h1>)}
    </div>
  );
}

export default Map;
