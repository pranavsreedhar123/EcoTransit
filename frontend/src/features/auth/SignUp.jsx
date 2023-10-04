import { Box, Button, ButtonGroup, SimpleGrid } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";

import { useAppDispatch } from "app/hooks";
import ModalForm from "components/ModalForm";
import { signUp } from "features/auth/thunks";
import { showToast } from "features/toastSlice";
import { showErrorToast } from "utils/error";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required().trim(),
  lastName: Yup.string().required().trim(),
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

const SignUp = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null);
  const dispatch = useAppDispatch();

  const onSignUp = async (values) => {
    const res = await dispatch(signUp(values));
    if (signUp.fulfilled.match(res)) {
      const user = res.payload;
      dispatch(
        showToast({
          title: "Account created.",
          description: `Welcome to EcoTransit, ${user.name}!`,
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
      modalHeader="Create Your Account"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSignUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={3}>
              <InputControl
                ref={initialRef}
                name="firstName"
                label="First Name"
                isRequired
              />
              <InputControl name="lastName" label="Last Name" isRequired />
            </SimpleGrid>
            <InputControl name="email" label="Email" isRequired />
            <InputControl
              name="password"
              label="Password"
              inputProps={{ type: "password" }}
              isRequired
            />

            <ButtonGroup float={"right"}>
              <SubmitButton>Create Account</SubmitButton>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </ModalForm>
  );
};

export default SignUp;
