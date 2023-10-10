import { Button, HStack, Heading, Spacer, Text, Highlight } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "app/hooks";
import { signOut } from "features/auth/thunks";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const onLogOut = async () => {
    await dispatch(signOut());
    navigate("/", { replace: true });
  };

  return (
    <HStack pt={10} pb={5}>
      <Heading size={"2xl"}>
        <Highlight
          query="EcoTransit"
          styles={{ px: "2", py: "1", rounded: "full", bg: "green.100" }}
        >
        EcoTransit
        </Highlight>
        </Heading>
      <Spacer />
      <Text>Hello, {user.name}!</Text>
      <Button colorScheme={"red"} onClick={onLogOut}>
        Log Out
      </Button>
    </HStack>
  );
};

export default Navbar;
