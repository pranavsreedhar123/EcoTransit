import {
  useDisclosure,
  ButtonGroup,
  Button,
  Text,
  Stack,
  Box,
} from "@chakra-ui/react";
import "./styles/App.css";
import { useState } from "react";
import Map from "./Map";
import LogIn from "features/auth/LogIn";
import SignUp from "features/auth/SignUp";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { signOut } from "features/auth/thunks";

function App() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

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

  const onLogOut = async () => {
    await dispatch(signOut());
  };

  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  return (
    <div className="App">
      <Stack my={5}>
        <Box mx={"auto"} mb={3}>
          {isLoggedIn ? (
            <div>
              <Text>Hello, {user.name}</Text>
              <Button onClick={onLogOut}>Sign Out</Button>
            </div>
          ) : (
            <ButtonGroup>
              <Button onClick={onOpenSignUp}>Sign Up</Button>
              <Button onClick={onOpenLogIn}>Log In</Button>
            </ButtonGroup>
          )}
        </Box>
        <Map />
      </Stack>
      <SignUp isOpen={isOpenSignUp} onClose={onCloseSignUp} />
      <LogIn isOpen={isOpenLogIn} onClose={onCloseLogIn} />
    </div>
  );
}

export default App;
