import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../models/user";
// Register => Nada
// Login => userLoged{
//   token,
//   ...,
//   ...
// }
// Lista de Usuario

type State = {
  userLoged: {
    token: string;
    user: User;
  } | null;
  users: User[];
};

type LoginData = {
  token: string;
  user: User;
};

export const asyncLoadUsers = createAsyncThunk("user/loadUser", async () => {
  const response = await fetch("");

  return response.json();
});

const initialState: State = {
  userLoged: null,
  users: [],
};

export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginData>) {
      state.userLoged = {
        token: action.payload.token,
        user: action.payload.user,
      };
    },
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
    builder.addCase(asyncLoadUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const { loadUsers, login, logout, updateRelations } = slice.actions;
export const { reducer } = slice;
