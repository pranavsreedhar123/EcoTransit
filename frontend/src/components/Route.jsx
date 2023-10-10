import { useState } from "react";
import {
  VStack,
  Textarea,
  Text,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Route = () => {
  let [valueS, setValueS] = useState("");
  let [valueE, setValueE] = useState("");
  let [transportationMethod, setTransportationMethod] = useState("");
  let handleInputChangeS = (e) => {
    let inputValue = e.target.value;
    setValueS(inputValue);
  };
  let handleInputChangeE = (e) => {
    let inputValue = e.target.value;
    setValueE(inputValue);
  };
  let handleTransportationChange = (e) => {
    let inputValue = e.target.value;
    setTransportationMethod(inputValue);
  };

  const toast = useToast();
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  const routeChange = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/getLocation/${valueS}/${valueE}`,
      );

      if (!response.ok) {
        console.log("ERROR");

        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      let path = `/map`;
      navigate(path, { state: { ...data, transportationMethod } });
    } catch (error) {
      toast({
        title: "Error Finding Route!",
        description: "Make sure to enter valid locations in the U.S",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
      setLoading(false);
    }
    // const data = { start: valueS, end: valueE };
  };
  return (
    <>
      <VStack spacing={1} alignItems={"flex-start"} padding={30} fontSize={25}>
        <h1 size="xl">
          Welcome to EcoTransit! Begin by entering your start and end locations
          within the United States of America, as well as a method of
          transportation.
        </h1>
        <Box
          borderRadius={10}
          padding={2}
          minWidth={450}
          borderWidth="2px"
          borderColor={"gray"}
        >
          <Text mb="25px">Start: </Text>
          <Textarea
            value={valueS}
            onChange={handleInputChangeS}
            placeholder="Enter Starting Point"
            fontSize={20}
            size="sm"
          />
        </Box>
        <Box
          borderRadius={10}
          padding={2}
          minWidth={450}
          borderWidth="2px"
          borderColor={"gray"}
        >
          <Text mb="25px">End: </Text>
          <Textarea
            value={valueE}
            onChange={handleInputChangeE}
            placeholder="Enter Destination"
            fontSize={20}
            size="sm"
          />
        </Box>
        <Button
          onClick={routeChange}
          colorScheme="blue"
          minW={450}
          isLoading={loading}
        >
          Submit
        </Button>
      </VStack>
    </>
  );
};

export default Route;
