import { useEffect, useState } from "react";
import { Center, VStack, Box, Button, FormControl, Select } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
  });

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

  const handleTransportationChange = (e) => {
    const selectedMode = e.target.value;
    setData((prevData) => ({
      ...prevData,
      transportationMode: selectedMode,
    }));
  };

  const navigate = useNavigate();
  const routeChange = () => {
    let path = `/route`;
    navigate(path);
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
            <Select
              onChange={handleTransportationChange}
            >
              <option value="Walking">Walking</option>
              <option value="Biking">Biking</option>
              <option value="Driving">Driving</option>
              <option value="Public Transit">Public Transit</option>
              <option value="Flying">Flying</option>
            </Select>
          </FormControl>
          </Box>
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
