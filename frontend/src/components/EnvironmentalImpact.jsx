import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const EnvironmentalImpact = () => {
  const location = useLocation();
  const [selectedTransportation, setSelectedTransportation] = useState("");
  const [distance, setDistance] = useState(0);

  const [resultMessage, setResultMessage] = useState("");
  const toast = useToast();
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
    valueS: "",
    valueE: "",
  });

  const handleTransportationChange = (event) => {
    setSelectedTransportation(event.target.value);
  };

  return (
    <>
      <Navbar />
      <VStack padding={300}>
        <Box
          bg="green.100"
          minW={530}
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
              <option value="">Select Transportation</option>
              <option value="Driving">Driving</option>
              <option value="Walking">Walking</option>
              <option value="Bicycling">Bicycling</option>
              <option value="Public Transit">Public Transit</option>
              <option value="Flying">Flying</option>
            </Select>
          </FormControl>
          <Button
            onClick={() => calculateImpact(distance, selectedTransportation)}
            colorScheme="blue"
            width={510}
            disabled={!selectedTransportation}
          >
            Calculate Environmental Impact
          </Button>
        </Box>
        {resultMessage && (
          <Box
            bg="green.100"
            minW={530}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={2}
          >
            <Text align="center">
              <b>{resultMessage}</b>
            </Text>
          </Box>
        )}
      </VStack>
    </>
  );
};

export default EnvironmentalImpact;
