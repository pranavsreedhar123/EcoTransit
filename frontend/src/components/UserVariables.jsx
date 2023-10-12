import { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Box,
  Button,
  FormControl,
  Select,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const UserVariables = (props) => {
  const toast = useToast();
  const location = useLocation();
  const [selectedMode, setSelectMode] = useState("Driving");
  const [carID, setCarID] = useState("1");
  const [passenger, setPassengers] = useState(1);
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

  useEffect(() => {
    console.log(data);
    const getLocation = async () => {
      const data = location.state;

      setData({
        origin: getPoint(data.originlat, data.originlng),
        destination: getPoint(data.destinationlat, data.destinationlng),
        ...data,
      });
      console.log(data);
    };

    getLocation();
  }, [data, location]);

  const handleTransportationChange = (e) => {
    const selectedMode = e.target.value;
    setSelectMode(selectedMode);
  };

  const handleCarIdChange = (e) => {
    const selectedCarId = e.target.value;
    setCarID(selectedCarId);
  };

  const handlePassengerChange = (e) => {
    var p = e.target.value;
    setPassengers(p);
  };

  const navigate = useNavigate();
  const routeChange = async () => {
    let path = `/results`;
    var carbonG = 0;
    if (selectedMode === "Walking" || selectedMode === "Biking") {
      carbonG = 0;
    } else if (selectedMode === "Driving") {
      if (data.distanceD != "N/A") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestBody = JSON.stringify({
          type: "vehicle",
          distance_unit: "mi",
          distance_value: parseFloat(data.distanceD.replace(/[^\d.-]/g, "")),
          vehicle_model_id: "7268a9b7-17e8-4c8d-acca-57059252afe9",
        });
        const url = "http://localhost:8080/carbonFootprintVehicle";
        var res = "";
        await fetch(url, {
          method: "POST",
          body: requestBody,
          headers: myHeaders,
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            res = result;
          })
          .catch((error) => {
            console.error("Error:", error);
            toast({
              title: "Error!",
              description:
                "An error occurred while fetching data from the server.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
        console.log(JSON.parse(res).data.attributes.carbon_g);
        carbonG = JSON.parse(res).data.attributes.carbon_kg / passenger;
      } else {
        toast({
          title: "Error!",
          description:
            "There was no route found for this mode of transport! Choose another mode.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    } else if (selectedMode === "Public Transit") {
      if (data.distanceT != "N/A") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestBody = JSON.stringify({
          type: "shipping",
          distance_unit: "mi",
          distance_value: parseFloat(data.distanceT.replace(/[^\d.-]/g, "")),
          transport_method: "train",
          weight_unit: "kg",
          weight_value: 90000,
        });
        const url = "http://localhost:8080/carbonFootprintTransit";
        var res = "";
        await fetch(url, {
          method: "POST",
          body: requestBody,
          headers: myHeaders,
        })
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            res = result;
          })
          .catch((error) => {
            console.error("Error:", error);
            toast({
              title: "Error!",
              description:
                "An error occurred while fetching data from the server.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
        console.log(JSON.parse(res).data.attributes.carbon_g);
        carbonG = JSON.parse(res).data.attributes.carbon_kg / passenger;
      } else {
        toast({
          title: "Error!",
          description:
            "There was no route found for this mode of transport! Choose another mode.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    navigate(path, {
      state: { ...data, selectedMode, carID, passenger, carbonG },
    });
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
              <Select onChange={handleTransportationChange}>
                <option value="Driving">Driving</option>
                <option value="Walking">Walking</option>
                <option value="Biking">Biking</option>
                <option value="Public Transit">Public Transit</option>
              </Select>
            </FormControl>
          </Box>
          {data.transportationMode !== "Walking" &&
            data.transportationMode !== "Biking" && (
              <Box
                bg="green.100"
                minW={450}
                borderColor={"gray"}
                borderWidth="2px"
                borderRadius="lg"
                padding={2}
              >
                <h1>
                  <b>Number of Passengers (1000 MAX): </b>
                </h1>
                <FormControl>
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
              </Box>
            )}
          {data.transportationMode === "Driving" && (
            <Box
              bg="green.100"
              minW={450}
              borderColor={"gray"}
              borderWidth="2px"
              borderRadius="lg"
              padding={2}
            >
              <h1>
                <b>Vehicle Specification: </b>
              </h1>
              <FormControl>
                <Select onChange={handleCarIdChange}>
                  <option value="Car 1">Car 1</option>
                  <option value="Car 2">Car 2</option>
                  <option value="Car 3">Car 3</option>
                  <option value="Car 4">Car 4</option>
                  <option value="Car 5">Car 5</option>
                </Select>
              </FormControl>
            </Box>
          )}
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
