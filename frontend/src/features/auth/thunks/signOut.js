import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "utils/initFirebase";

export const signOut = createAsyncThunk("auth/signOut", async () => {
  await firebaseSignOut(auth);
});
