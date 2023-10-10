import { FirebaseError } from "firebase/app";

import { showToast } from "features/toastSlice";

export const errorHandler = (error) => {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage = error.message;
    if (error instanceof FirebaseError) {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email";
          break;
        case "auth/weak-password":
          errorMessage = "Weak password";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password";
          break;
      }
    }
  } else console.error(error);

  return errorMessage;
};

export const showErrorToast = (dispatch, res, message = null) => {
  const errorMessage =
    message === null
      ? res.payload
        ? res.payload
        : res.error.message
      : message;
  dispatch(
    showToast({
      title: "Error",
      description: errorMessage,
      status: "error",
    }),
  );
};
