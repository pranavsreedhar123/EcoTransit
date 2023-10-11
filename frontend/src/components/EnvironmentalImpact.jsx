import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, FormControl, Select } from "@chakra-ui/react";
import Axios from "axios";

const EnvironmentalImpact = () => {
  const [selectedTransportation, setSelectedTransportation] = useState("");
  const [distance, setDistance] = useState(0);
  const [impact, setImpact] = useState(0);

  const handleTransportationChange = (event) => {
    setSelectedTransportation(event.target.value);
  };

  const calculateImpact = (distance, selectedTransportation) => {
    if (selectedTransportation) {
      Axios.get(
        `http://localhost:8080/environmental-impact/${distance}/${selectedTransportation}`,
      )
        .then((response) => {
          const calculatedImpact = response.data.positiveImpact;
          setImpact(calculatedImpact); // Update the impact state

          if (calculatedImpact > 0) {
            toast.info(
              `This is equivalent to planting ${calculatedImpact} trees.`,
            );
          } else {
            toast.info("This mode doesn't contribute to planting trees.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("An error occurred while fetching data from the server.");
        });
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
        onClick={() => calculateImpact(distance, selectedTransportation)}
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
