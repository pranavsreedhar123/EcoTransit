import { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Results = (props) => {
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
    otherTransportationMode: "",
    otherCarId: "",
    otherPassengers: 1,
  });

  const [isSecondBoxVisible, setIsSecondBoxVisible] = useState(true);
  const [isThirdBoxVisible, setIsThirdBoxVisible] = useState(false);
  const [isComparisonResultVisible, setIsComparisonResultVisible] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      const data = location.state;
      console.log(data);
      setData({
        ...data,
      });
    };

    getLocation();
  }, [location]);

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/route`;
    navigate(path);
  };

  const handleTransportationChange = (e) => {
    const selectedMode = e.target.value;
    setData((prevData) => ({
      ...prevData,
      otherTransportationMode: selectedMode,
    }));
    setIsThirdBoxVisible(selectedMode === 'Driving');
    setIsSecondBoxVisible(selectedMode !== 'Walking' && selectedMode !== 'Biking');
  };

  const handleCarIdChange = (e) => {
    const selectedCarId = e.target.value;
    setData((prevData) => ({
      ...prevData,
      otherCarId: selectedCarId,
    }));
  };

  const handlePassengerChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      otherPassengers: e,
    }));
  };

  const showComparisonResult = () => {
    setIsComparisonResultVisible(true);
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
            padding={6}
          >
            <h1>
              <b>Carbon Footprint:</b> 10 g
            </h1>
          </Box>
          <Box
            bg="green.100"
            minW={450}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={6}
          >
            <h1>
              <b>Compare to Other Transportation Methods</b>
            </h1>
            <FormControl>
              <FormLabel>Select an alternative transportation method:</FormLabel>
              <Select onChange={handleTransportationChange}>
                <option value="Public Transit">Public Transit</option>
                <option value="Flying">Flying</option>
                <option value="Driving">Driving</option>
                <option value="Walking">Walking</option>
                <option value="Biking">Biking</option>
              </Select>
            </FormControl>
            {isSecondBoxVisible && (
              <FormControl>
                <FormLabel>Select an alternative number of passengers (1000 MAX):</FormLabel>
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
            )}
            {isThirdBoxVisible && (
              <FormControl>
                <FormLabel>Select an alternative vehicle Specification: </FormLabel>
                <Select onChange={handleCarIdChange}>
                  <option value="Car 1">Car 1</option>
                  <option value="Car 2">Car 2</option>
                  <option value="Car 3">Car 3</option>
                  <option value="Car 4">Car 4</option>
                  <option value="Car 5">Car 5</option>
                </Select>
              </FormControl>
            )}
            <Button onClick={showComparisonResult} colorScheme="blue" width={450}>
              Calculate Alternate Carbon Estimate
            </Button>
            {isComparisonResultVisible && (
              <h3><b>Alternate Carbon Footprint: </b> 15 g</h3>
            )}
          </Box>
          <Box
            bg="green.100"
            minW={450}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={6}
          >
            <h1>
              <b>Environmental Impact Stuff Goes Here!</b>
            </h1>
          </Box>
        </VStack>
      </Center>
    </>
  );
};

export default Results;
