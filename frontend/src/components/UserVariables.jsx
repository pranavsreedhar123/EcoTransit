import { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Box,
  Button,
  FormControl,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const UserVariables = (props) => {
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
    transportationMode: "",
    carId: "",
    passengers: 1,
  });

  useEffect(() => {
    const getLocation = async () => {
      const data = location.state;
      setData({
        origin: getPoint(data.originlat, data.originlng),
        destination: getPoint(data.destinationlat, data.destinationlng),
        ...data,
      });
    };

    getLocation();
  }, [location]);

  const handleTransportationChange = (e) => {
    const selectedMode = e.target.value;
    setData((prevData) => ({
      ...prevData,
      transportationMode: selectedMode,
    }));
  };

  const handleCarIdChange = (e) => {
    const selectedCarId = e.target.value;
    setData((prevData) => ({
      ...prevData,
      carId: selectedCarId,
    }));
  };

  const handlePassengerChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      passengers: e,
    }));
  };

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/environmental-impact`;
    navigate(path, { state: data });
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
              <b>Mode of Transportation: </b>
            </h1>
            <FormControl>
              <Select onChange={handleTransportationChange}>
                <option value="Public Transit">Public Transit</option>
                <option value="Flying">Flying</option>
                <option value="Driving">Driving</option>
                <option value="Walking">Walking</option>
                <option value="Biking">Biking</option>
              </Select>
            </FormControl>
          </Box>
          {data.transportationMode !== "Walking" &&
            data.transportationMode !== "Biking" && (
              <Box
                bg="green.100"
                minW={450}
                borderColor={"gray"}
                borderWidth="2px"
                borderRadius="lg"
                padding={2}
              >
                <h1>
                  <b>Number of Passengers (1000 MAX): </b>
                </h1>
                <FormControl>
                  <NumberInput
                    min={1}
                    max={1000}
                    defaultValue={1}
                    onChange={(valueString, valueNumber) =>
                      handlePassengerChange(valueNumber)
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
              </Box>
            )}
          {data.transportationMode === "Driving" && (
            <Box
              bg="green.100"
              minW={450}
              borderColor={"gray"}
              borderWidth="2px"
              borderRadius="lg"
              padding={2}
            >
              <h1>
                <b>Vehicle Specification: </b>
              </h1>
              <FormControl>
                <Select onChange={handleCarIdChange}>
                  <option value="Car 1">Car 1</option>
                  <option value="Car 2">Car 2</option>
                  <option value="Car 3">Car 3</option>
                  <option value="Car 4">Car 4</option>
                  <option value="Car 5">Car 5</option>
                </Select>
              </FormControl>
            </Box>
          )}
          <Box paddingTop={50}>
            <Button onClick={routeChange} colorScheme="blue" width={450}>
              Calculate Carbon Estimate
            </Button>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default UserVariables;
