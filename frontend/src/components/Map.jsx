import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  PolylineF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const isValidPoint = (point) => point.lat !== null && point.lng !== null;
const Map = (props) => {
  const location = useLocation();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [data, setData] = useState({
    origin: { lat: null, lng: null },
    destination: { lat: null, lng: null },
    transportationMethod: "",
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
      const { originlat, originlng, destinationlat, destinationlng, transportationMethod } = location.state;
      setData({
        origin: getPoint(originlat, originlng),
        destination: getPoint(destinationlat, destinationlng),
        transportationMethod,
      });
    };

    getLocation();

    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setZoom(6);
    });
  }, [location]);

  return (
    <>
      <VStack spacing={1} alignItems={"flex-start"}>
      <h2>
          <b>Mode of Transportation</b>: {data.transportationMethod}
        </h2>
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
      </VStack>

      {/* height = 1 is a hack to get the map to show properly */}
      <Box flexGrow={1} height={1}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
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
      </Box>
    </>
  );
};

export default Map;
