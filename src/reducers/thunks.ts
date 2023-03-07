import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../models/user";

type LoginData = {
  token: string;
  user: User;
};

export const asyncLoadUsers = createAsyncThunk("user/loadUser", async () => {
  const response = await fetch("");

  return response.json();
});

export const asyncLogin = createAsyncThunk<LoginData>(
  "user/loadUser",
  async () => {
    const response = await fetch("");

    return response.json();
  }
);
