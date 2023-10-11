import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Highlight,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "app/hooks";
import LogIn from "features/auth/LogIn";
import SignUp from "features/auth/SignUp";

const Start = () => {
  const navigate = useNavigate();
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();
  const {
    isOpen: isOpenLogIn,
    onOpen: onOpenLogIn,
    onClose: onCloseLogIn,
  } = useDisclosure();

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
    if (isLoggedIn) {
      navigate("/route", { replace: true });
    }
  });

  return (
    // center element vertically and horizontally
    <Box
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      textAlign={"center"}
    >
      <Heading size={"4xl"} my={5}>
        <Highlight
          query="EcoTransit"
          styles={{ px: "2", py: "1", rounded: "full", bg: "green.100" }}
        >
          Welcome to EcoTransit.
        </Highlight>
      </Heading>
      <ButtonGroup>
        <Button onClick={onOpenSignUp}>Sign Up</Button>
        <Button onClick={onOpenLogIn}>Log In</Button>
      </ButtonGroup>
      <SignUp isOpen={isOpenSignUp} onClose={onCloseSignUp} />
      <LogIn isOpen={isOpenLogIn} onClose={onCloseLogIn} />
    </Box>
  );
};

export default Start;
