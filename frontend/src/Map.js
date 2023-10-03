import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  PolylineF,
} from "@react-google-maps/api";
import "./styles/Map.css";
import { useEffect, useState } from "react";

function Map(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [data, setData] = useState([
    { lat: 0, lng: 0 },
    { lat: 90, lng: 90 },
  ]);

  async function getLocation() {
    await fetch("http://localhost:8080/getLocation/Nashville/New York")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  useEffect(() => {
    getLocation();
  }, []);
  let location = [
    {
      lat: parseFloat(data.originlat),
      lng: parseFloat(data.originlng),
    },
    {
      lat: parseFloat(data.destinationlat),
      lng: parseFloat(data.destinationlng),
    },
  ];

  const [currentlocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);
  return (
    <div>
      <div>
        <h2>
          <b>Duration (Drive)</b>: {data.durationD}
        </h2>
        <h2>
          <b>Distance (Drive)</b>: {data.distanceD}
        </h2>
        <h2>
          <b>Duration (Walk)</b>: {data.durationW}
        </h2>
        <h2>
          <b>Distance (Walk)</b>: {data.distanceW}
        </h2>
        <h2>
          <b>Duration (Transit</b> (If Available, else Driving)<b>)</b>:{" "}
          {data.durationT}
        </h2>
        <h2>
          <b>Distance (Transit</b> (If Available, else Driving)<b>)</b>:{" "}
          {data.distanceT}
        </h2>
      </div>
      <div className="map">
        {isLoaded ? (
          <GoogleMap
            mapContainerClassName="map-container"
            zoom={5}
            center={currentlocation}
          >
            <MarkerF position={location[0]} />
            <MarkerF position={location[1]} />
            <PolylineF
              path={location}
              geodesic={true}
              options={{
                strokeColor: "#ff2527",
                strokeOpacity: 0.75,
                strokeWeight: 2,
              }}
            />
          </GoogleMap>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
}

export default Map;
