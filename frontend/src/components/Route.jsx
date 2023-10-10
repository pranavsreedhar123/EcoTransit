import { useState } from "react";
import {
  VStack,
  Textarea,
  Text,
  Button,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
  const toast = useToast();
  const navigate = useNavigate();
  const routeChange = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getLocation/${valueS}/${valueE}`,
      );

      if (!response.ok) {
        console.log("ERROR");

        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      //   console.log(data);
      let path = `/map`;
      navigate(path, { state: data });
    } catch (error) {
      toast({
        title: "Error Finding Route!",
        description: "Make sure to enter valid locations in the U.S",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
    // const data = { start: valueS, end: valueE };
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
        <Button onClick={routeChange} colorScheme="blue">
          Submit
        </Button>
      </VStack>
    </>
  );
};

export default Route;
