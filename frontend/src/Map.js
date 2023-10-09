import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  PolylineF,
} from "@react-google-maps/api";
import "./styles/Map.css";
import { useEffect, useState } from "react";
import { showErrorToast } from "utils/error";
import { useAppDispatch } from "app/hooks";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const isValidPoint = (point) => point.lat !== null && point.lng !== null;
const Map = () => {
  const dispatch = useAppDispatch();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [data, setData] = useState({
    origin: { lat: null, lng: null },
    destination: { lat: null, lng: null },
    durationD: "",
    distanceD: "",
    distanceW: "",
    durationW: "",
    distanceT: "",
    durationT: "",
  });

  const [currentlocation, setCurrentLocation] = useState({
    lat: 37.0902,
    lng: -95.7129,
  });
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/getLocation/Nashville/New York",
        );
        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);
        const data = await response.json();
        setData({
          origin: getPoint(data.originlat, data.originlng),
          destination: getPoint(data.destinationlat, data.destinationlng),
          ...data,
        });
      } catch (error) {
        showErrorToast(dispatch, null, error.message);
      }
    };

    getLocation();

    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setZoom(6);
    });
  }, [dispatch]);

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
            zoom={zoom}
            center={currentlocation}
          >
            {isValidPoint(data.origin) && <MarkerF position={data.origin} />}
            {isValidPoint(data.destination) && (
              <MarkerF position={data.destination} />
            )}
            {isValidPoint(data.origin) && isValidPoint(data.destination) && (
              <PolylineF
                path={[data.origin, data.destination]}
                geodesic={true}
                options={{
                  strokeColor: "#ff2527",
                  strokeOpacity: 0.75,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Map;
