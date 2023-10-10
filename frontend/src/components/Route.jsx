import { useState } from "react";
import { VStack, Textarea, Text, Button } from "@chakra-ui/react";

const Route = () => {
  let [valueS, setValueS] = useState("");
  let [valueE, setValueE] = useState("");
  let handleInputChangeS = (e) => {
    let inputValue = e.target.value;
    setValueS(inputValue);
  };
  let handleInputChangeE = (e) => {
    let inputValue = e.target.value;
    setValueE(inputValue);
  };
  return (
    <>
      <h1 size="xl">
        Welcome to EcoTransit! Begin by entering your start and end locations
        within the United States of America
      </h1>
      <VStack spacing={1} alignItems={"flex-start"} padding={15}>
        <Text mb="8px">Start: </Text>
        <Textarea
          value={valueS}
          onChange={handleInputChangeS}
          placeholder="Enter Starting Point"
          size="sm"
        />
        <Text mb="8px">End: </Text>
        <Textarea
          value={valueE}
          onChange={handleInputChangeE}
          placeholder="Enter Destination"
          size="sm"
        />
        <Button colorScheme="blue">Submit</Button>
      </VStack>
    </>
  );
};

export default Route;
