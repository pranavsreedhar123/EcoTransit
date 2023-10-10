import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword as createUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { errorHandler } from "utils/error";
import { auth, db } from "utils/initFirebase";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password, firstName, lastName }, thunkAPI) => {
    try {
      const { user: firebaseUser } = await createUser(auth, email, password);
      const user = {
        name: `${firstName} ${lastName}`,
        email: email,
      };
      await setDoc(doc(db, "users", firebaseUser.uid), user);

      return {
        refreshToken: firebaseUser.refreshToken,
        uid: firebaseUser.uid,
        ...user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  },
);
