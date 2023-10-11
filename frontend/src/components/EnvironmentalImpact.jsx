import React, { useState } from "react";
import { Box, Button, FormControl, Select, Text } from "@chakra-ui/react";

const EnvironmentalImpact = () => {
  const [selectedTransportation, setSelectedTransportation] = useState("");
  const [distance, setDistance] = useState(0);
  const [impact, setImpact] = useState(0);
  const [resultMessage, setResultMessage] = useState("");

  const handleTransportationChange = (event) => {
    setSelectedTransportation(event.target.value);
  };

  const calculateImpact = async (distance, selectedTransportation) => {
    if (selectedTransportation) {
      try {
        const response = await fetch(
          `http://localhost:8080/environmental-impact/${distance}/${selectedTransportation}`,
        );

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
            title: "Error !",
            description: "An error occurred while fetching data from the server.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
      }
    } else {
      setResultMessage("Please select a transportation method.");
    }
  };

  return (
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
          <option value="">Select Transportation</option>
          <option value="Walking">Walking</option>
          <option value="Biking">Biking</option>
          <option value="Driving">Driving</option>
          <option value="Public Transit">Public Transit</option>
          <option value="Flying">Flying</option>
        </Select>
      </FormControl>
      <Button
        onClick={() => calculateImpact(distance, selectedTransportation)}
        colorScheme="blue"
        width={450}
        disabled={!selectedTransportation}
      >
        Calculate Environmental Impact
      </Button>
      {resultMessage && <Text>{resultMessage}</Text>}
    </Box>
  );
};

export default EnvironmentalImpact;
