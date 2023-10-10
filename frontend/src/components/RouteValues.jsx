import { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Box,
  Button,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const RouteValues = (props) => {
  const location = useLocation();

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

  useEffect(() => {
    const getLocation = async () => {
      const data = location.state;
      console.log(data);
      setData({
        origin: getPoint(data.originlat, data.originlng),
        destination: getPoint(data.destinationlat, data.destinationlng),
        ...data,
      });
    };

    getLocation();
  }, [location]);

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/user-variables`;
    navigate(path);
  };

  return (
    <>
      <Navbar />
      <Center>
        <VStack
          spacing={1}
          paddingTop={100}
          alignItems={"flex-start"}
          fontSize={25}
        >
          <Box
            bg="green.100"
            minW={450}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={2}
          >
            <h1>
              <b>Drive: </b>
            </h1>
            <li>Distance: {data.distanceD}</li>
            <li>Duration: {data.durationD}</li>
          </Box>
          <Box
            bg="green.100"
            minW={450}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={2}
          >
            <h2>
              <b>Walk: </b>
            </h2>
            <li>Distance: {data.distanceW}</li>
            <li>Duration: {data.durationW}</li>
          </Box>
          <Box
            bg="green.100"
            minW={450}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={2}
          >
            <h2>
              <b>Transit</b> (If Available, else uses Default)<b>: </b>
            </h2>
            <li>Distance: {data.distanceT}</li>
            <li>Duration: {data.durationT}</li>
          </Box>

          <Box paddingTop={50}>
            <Button onClick={routeChange} colorScheme="blue" width={450}>
              Continue to Input Variables
            </Button>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default RouteValues;
