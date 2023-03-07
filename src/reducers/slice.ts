import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { asyncLoadUsers, asyncLogin } from "./thunks";
// Register => Nada
// Login => userLoged{
//   token,
//   ...,
//   ...
// }
// Lista de Usuario

type Status = "loading" | "idle" | "pluf";

type State = {
  UserLoginStatus: Status;
  userLoged: {
    token: string;
    user: User;
  } | null;
  isLoadingUsersStatus: Status;
  users: User[];
};

const initialState: State = {
  UserLoginStatus: "idle",
  userLoged: null,
  isLoadingUsersStatus: "idle",
  users: [],
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userLoged = null;
      state.users = [];
    },

    loadUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },

    updateRelations(state, action: PayloadAction<User>) {
      state.userLoged!.user = action.payload;
      state.users = state.users.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
  extraReducers(builder) {
    // LOAD
    builder.addCase(asyncLoadUsers.pending, (state) => {
      state.isLoadingUsersStatus = "loading";
    });
    builder.addCase(asyncLoadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoadingUsersStatus = "idle";
    });
    builder.addCase(asyncLoadUsers.rejected, (state) => {
      state.isLoadingUsersStatus = "pluf";
    });

    // LOGIN
    builder.addCase(asyncLogin.pending, (state) => {
      state.UserLoginStatus = "loading";
    });
    builder.addCase(asyncLogin.fulfilled, (state, action) => {
      state.userLoged = {
        token: action.payload.token,
        user: action.payload.user,
      };
    });
    builder.addCase(asyncLogin.rejected, (state) => {
      state.UserLoginStatus = "pluf";
    });
  },
});

export const { loadUsers, logout, updateRelations } = slice.actions;
export const { reducer } = slice;
