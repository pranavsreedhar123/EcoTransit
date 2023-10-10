import {
  GoogleMap,
  MarkerF,
  useJsApiLoader,
  PolylineF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
    durationD: "",
    distanceD: "",
    distanceW: "",
    durationW: "",
    distanceT: "",
    durationT: "",
    distanceC: "",
    durationC: "",
  });

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/route-value`;
    navigate(path, { state: data });
  };
  const [zoom, setZoom] = useState(5);
  useEffect(() => {
    const getLocation = async () => {
      const data = location.state;
      console.log(data);
      setData({
        origin: getPoint(data.originlat, data.originlng),
        destination: getPoint(data.destinationlat, data.destinationlng),
        ...data,
      });
      if (parseFloat(data.distanceD.replace(/[^\d.-]/g, "")) < 10) {
        setZoom(15);
      } else if (parseFloat(data.distanceD.replace(/[^\d.-]/g, "")) < 100) {
        setZoom(10);
      } else if (parseFloat(data.distanceD.replace(/[^\d.-]/g, "")) < 500) {
        setZoom(8);
      } else {
        setZoom(5);
      }
    };

    getLocation();
  }, [location]);
  const center = getPoint(
    (data.origin.lat + data.destination.lat) / 2,
    (data.origin.lng + data.destination.lng) / 2,
  );
  return (
    <>
      <Navbar />
      {/* height = 1 is a hack to get the map to show properly */}
      <Box flexGrow={1} height={1}>
        {isLoaded &&
        isValidPoint(data.origin) &&
        isValidPoint(data.destination) ? (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={zoom}
            center={center}
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
      <Button onClick={routeChange} colorScheme="blue">
        Next
      </Button>
    </>
  );
};

export default Map;
