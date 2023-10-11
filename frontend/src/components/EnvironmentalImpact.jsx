import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, FormControl, Select } from "@chakra-ui/react";

const EnvironmentalImpact = () => {
  const [selectedTransportation, setSelectedTransportation] = useState("");
  const [impact, setImpact] = useState(0); // Initialize impact with 0

  const handleTransportationChange = (event) => {
    setSelectedTransportation(event.target.value);
  };

  const calculateImpact = (distance, selectedTransportation) => {
    switch (selectedTransportation) {
      case "Walking":
        return 0.2 * distance; // Assuming 0.2 trees planted per mile walked
      case "Biking":
        return 0.1 * distance; // Assuming 0.1 trees planted per mile cycled
      case "Driving":
        return 0; // No trees planted for driving
      case "Public Transit":
        return 0.05 * distance; // Assuming 0.05 trees planted per mile using public transit
      case "Flying":
        return 0.05 * distance; // Assuming 0.05 trees planted per mile of flying
      default:
        return 0; // Default to no impact
    }
  };

  const displayEnvironmentalImpact = () => {
    if (selectedTransportation) {
      const calculatedImpact = calculateImpact(10, selectedTransportation); // Replace 10 with the actual distance
      setImpact(calculatedImpact); // Update the impact state

      if (calculatedImpact > 0) {
        toast.info(`This is equivalent to planting ${calculatedImpact} trees.`);
      } else {
        toast.info("This mode doesn't contribute to planting trees.");
      }
    } else {
      toast.error("Please select a transportation method.");
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
        onClick={displayEnvironmentalImpact}
        colorScheme="blue"
        width={450}
        disabled={!selectedTransportation}
      >
        Calculate Environmental Impact
      </Button>
      {impact > 0 && <p>This is equivalent to planting {impact} trees.</p>}
      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default EnvironmentalImpact;
