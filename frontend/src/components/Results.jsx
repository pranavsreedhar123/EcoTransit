import { useEffect, useState } from "react";
import {
  Center,
  VStack,
  Box,
  Button,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useToast } from "@chakra-ui/react";

const getPoint = (lat, lng) => ({ lat: parseFloat(lat), lng: parseFloat(lng) });
const Results = (props) => {
  const toast = useToast();
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
    distanceC: "",
    durationC: "",
    valueS: "",
    valueE: "",
    selectedMode: "",
    carID: "",
    passenger: 1,
    carbonG: 0,
  });
  const [otherTransportationMode, setOtherTransportationMode] =
    useState("Public Transit");
  const [otherPassengers, setOtherPassengers] = useState(1);
  const [otherCarID, setOtherCarID] = useState("");
  const [otherCarbonG, setOtherCarbonG] = useState(0);
  const [impactCheck, setImpactCheck] = useState(false);
  const [impactCheckBox, setImpactCheckBox] = useState(false);
  const [isSecondBoxVisible, setIsSecondBoxVisible] = useState(true);
  const [isThirdBoxVisible, setIsThirdBoxVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [isComparisonResultVisible, setIsComparisonResultVisible] =
    useState(false);

  useEffect(() => {
    const getLocation = async () => {
      const data = location.state;
      // console.log(data);
      setData({
        origin: getPoint(data.originlat, data.originlng),
        destination: getPoint(data.destinationlat, data.destinationlng),
        ...data,
      });
      console.log(data.selectedMode);
      // await getCarbonFootprint(data.transportationMode);
    };

    getLocation();
  }, [location]);

  const getCarbonFootprint = async (mode) => {
    if (mode === "Walking" || mode === "Biking") {
      setOtherCarbonG(0);
    } else if (mode === "Driving") {
      if (data.distanceD != "N/A") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestBody = JSON.stringify({
          type: "vehicle",
          distance_unit: "mi",
          distance_value: parseFloat(data.distanceD.replace(/[^\d.-]/g, "")),
          vehicle_model_id: "7268a9b7-17e8-4c8d-acca-57059252afe9",
        });
        const url = `${process.env.REACT_APP_BACKEND_URL}/carbonFootprintVehicle`;
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
        setOtherCarbonG(
          JSON.parse(res).data.attributes.carbon_kg / otherPassengers,
        );
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
    } else if (mode === "Public Transit") {
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
        const url = `${process.env.REACT_APP_BACKEND_URL}/carbonFootprintTransit`;
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
        setOtherCarbonG(
          JSON.parse(res).data.attributes.carbon_kg / otherPassengers,
        );
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
    }
    setIsComparisonResultVisible(true);
    setImpactCheck(false);
    setImpactCheckBox(true);
    console.log(isComparisonResultVisible);
  };

  const handleTransportationChange = (e) => {
    const selectedMode = e.target.value;
    setOtherTransportationMode(selectedMode);
  };

  const handleCarIdChange = (e) => {
    const selectedCarId = e.target.value;
    setOtherCarID(selectedCarId);
  };

  const handlePassengerChange = (e) => {
    const passengers = e;
    setOtherPassengers(passengers);
  };

  const calculateImpact = async () => {
    try {
      let difference = otherCarbonG - data.carbonG;
      var response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/environmental-impact/${difference}`,
      );
      // console.log(difference);
      if (response.ok) {
        response = await response.json();
        const calculatedImpact = response.positiveImpact;
        console.log(calculatedImpact);
        if (calculatedImpact < 0) {
          setResultMessage(
            `The alternative mode of transport is equivalent to planting ${Math.abs(
              calculatedImpact,
            )} trees!`,
          );
        } else {
          setResultMessage(
            "This alternative mode doesn't contribute to planting trees!",
          );
        }
        console.log(resultMessage);
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      setImpactCheck(true);
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
  };

  return (
    <>
      <Navbar />
      <Center>
        <VStack
          spacing={1}
          paddingTop={50}
          alignItems={"flex-start"}
          fontSize={25}
        >
          <Box
            bg="green.100"
            minW={600}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={6}
          >
            <h1>
              <b>Current Carbon Footprint/passenger:</b> {data.carbonG} kg
            </h1>
          </Box>

          <Box
            bg="green.100"
            minW={600}
            borderColor={"gray"}
            borderWidth="2px"
            borderRadius="lg"
            padding={6}
          >
            <h1>
              <b>Compare to Other Transportation Methods</b>
            </h1>
            <FormControl>
              <FormLabel>
                Select an alternative transportation method:
              </FormLabel>
              <Select onChange={handleTransportationChange}>
                <option value="Public Transit">Public Transit</option>
                <option value="Driving">Driving</option>
                <option value="Walking">Walking</option>
                <option value="Biking">Biking</option>
              </Select>
            </FormControl>
            {isSecondBoxVisible && (
              <FormControl>
                <FormLabel>
                  Select an alternative number of passengers (1000 MAX):
                </FormLabel>
                <NumberInput
                  min={1}
                  max={1000}
                  defaultValue={1}
                  onChange={(valueNumber) => handlePassengerChange(valueNumber)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            )}
            {isThirdBoxVisible && (
              <FormControl>
                <FormLabel>
                  Select an alternative vehicle Specification:{" "}
                </FormLabel>
                <Select onChange={handleCarIdChange}>
                  <option value="Car 1">Car 1</option>
                  <option value="Car 2">Car 2</option>
                  <option value="Car 3">Car 3</option>
                  <option value="Car 4">Car 4</option>
                  <option value="Car 5">Car 5</option>
                </Select>
              </FormControl>
            )}
            <Button
              onClick={() => getCarbonFootprint(otherTransportationMode)}
              colorScheme="blue"
              width={450}
            >
              Calculate Alternate Carbon Estimate
            </Button>
            {isComparisonResultVisible && (
              <h3>
                <b>Alternate Carbon Footprint/passenger: </b> {otherCarbonG} kg
              </h3>
            )}
          </Box>
          {impactCheckBox && (
            <>
              <Box
                bg="green.100"
                width={600}
                borderColor={"gray"}
                borderWidth="2px"
                borderRadius="lg"
                padding={6}
              >
                {!impactCheck && (
                  <Button
                    onClick={() => calculateImpact()}
                    colorScheme="blue"
                    width={450}
                  >
                    See Environmental Impact
                  </Button>
                )}
                {impactCheck && <h4>{resultMessage}</h4>}
              </Box>
            </>
          )}
        </VStack>
      </Center>
    </>
  );
};
export default Results;
