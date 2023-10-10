import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "app/store";
import theme from "app/theme";
import Start from "routes/Start";
import App from "routes/App";
import Map from "components/Map";
import RouteValues from "components/RouteValues";
import UserVariables from "components/UserVariables";

const router = createBrowserRouter([
  { path: "/", element: <Start /> },
  { path: "/route", element: <App /> },
  { path: "/map", element: <Map /> },
  { path: "/route-value", element: <RouteValues /> },
  { path: "/user-variables", element: <UserVariables /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Container
            maxWidth={"7xl"}
            minHeight={"100vh"}
            display={"flex"}
            flexDirection={"column"}
          >
            <RouterProvider router={router} />
          </Container>
        </ChakraProvider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
