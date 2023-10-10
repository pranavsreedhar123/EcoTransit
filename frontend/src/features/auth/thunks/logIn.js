import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword as signIn } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { errorHandler } from "utils/error";
import { auth, db } from "utils/initFirebase";

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user: firebaseUser } = await signIn(auth, email, password);
      const userDoc = (await getDoc(doc(db, "users", firebaseUser.uid))).data();

      return {
        refreshToken: firebaseUser.refreshToken,
        name: userDoc.name,
        email: email,
        uid: firebaseUser.uid,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(errorHandler(error));
    }
  },
);
