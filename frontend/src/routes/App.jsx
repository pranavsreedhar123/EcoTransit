import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import Route from "components/Route";
import Navbar from "components/Navbar";

const App = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) navigate("/", { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <Flex flexDirection={"column"} flexGrow={1} mb={2}>
        <Route />
      </Flex>
    </>
  );
};

export default App;
