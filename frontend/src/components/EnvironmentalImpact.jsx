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
  const [distance, setDistance] = useState("");
  const [impact, setImpact] = useState(0);
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

  const calculateImpact = async () => {
    if (selectedTransportation != null) {
      try {
        const data = location.state;
        setData({
          origin: getPoint(data.originlat, data.originlng),
          destination: getPoint(data.destinationlat, data.destinationlng),
          ...data,
        });
        var d = "0";
        if (selectedTransportation == "Driving") {
          d = data.distanceD;
        } else if (selectedTransportation == "Walking") {
          d = data.distanceW;
        } else if (selectedTransportation == "Bicycling") {
          d = data.distanceC;
        } else if (
          selectedTransportation == "Public Transit" ||
          selectedTransportation == "Flying"
        ) {
          d = data.distanceT;
        }
        d = parseFloat(d.replace(/[^\d.-]/g, ""));
        setDistance(d);
        console.log(d);
        console.log(selectedTransportation);
        const response = await fetch(
          `http://localhost:8080/environmental-impact/${distance}/${selectedTransportation}`,
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          const calculatedImpact = data.positiveImpact;
          setImpact(calculatedImpact);

          if (calculatedImpact > 0) {
            setResultMessage(
              `This is equivalent to planting ${calculatedImpact} trees.`,
            );
          } else {
            setResultMessage("This mode doesn't contribute to planting trees.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error!",
          description: "An error occurred while fetching data from the server.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error!",
        description: "Please select a mode of transportation!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
            onClick={() => calculateImpact(selectedTransportation)}
            colorScheme="blue"
            width={510}
            disabled={!selectedTransportation}
          >
            Calculate Environmental Impact
          </Button>
        </Box>
        {resultMessage && (
          <>
            <Box
              bg="green.100"
              minW={530}
              borderColor={"gray"}
              borderWidth="2px"
              borderRadius="lg"
              padding={2}
            >
              <Text align="center">
                <b>Distance: {distance} mi</b>
              </Text>
            </Box>

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
          </>
        )}
      </VStack>
    </>
  );
};

export default EnvironmentalImpact;
