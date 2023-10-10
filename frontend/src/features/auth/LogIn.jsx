import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";

import { useAppDispatch } from "app/hooks";
import ModalForm from "components/ModalForm";
import { logIn } from "features/auth/thunks";
import { showToast } from "features/toastSlice";
import { showErrorToast } from "utils/error";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

const LogIn = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const onLogIn = async (values) => {
    const res = await dispatch(logIn(values));
    if (logIn.fulfilled.match(res)) {
      const user = res.payload;
      dispatch(
        showToast({
          title: "Logged in.",
          description: `Welcome back to EcoTransit, ${user.name}!`,
          status: "success",
        }),
      );
      onClose();
    } else showErrorToast(dispatch, res);
  };

  return (
    <ModalForm
      initialRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="Log Into EcoTransit"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onLogIn(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <InputControl
              ref={initialRef}
              name="email"
              label="Email"
              isRequired
            />
            <InputControl
              name="password"
              label="Password"
              inputProps={{ type: "password" }}
              isRequired
            />

            <ButtonGroup float={"right"}>
              <SubmitButton>Log In</SubmitButton>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </ModalForm>
  );
};

export default LogIn;
