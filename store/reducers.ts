import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  updateUser,
  fetchUser,
  setLoading,
  setError,
  fetchUsers,
  setSuccess,
} from "./actions";
import { UserValues } from "@/model/users";

export type User = Omit<UserValues, "recentlyActive"> & {
  recentlyActive: string;
};

export type Meta = {
  page: number;
  page_size: number;
  count: number;
  total: number;
};
export interface UserState {
  users: {
    data: User[];
    meta: Meta;
  };
  user: User;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: null,
  users: {
    data: [],
    meta: {} as Meta,
  },
  user: {} as User,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        setLoading,
        (state, action: PayloadAction<UserState["loading"]>) => {
          state.loading = action.payload;
        }
      )
      .addCase(setError, (state, action: PayloadAction<UserState["error"]>) => {
        state.error = action.payload;
      })
      .addCase(
        setSuccess,
        (state, action: PayloadAction<UserState["success"]>) => {
          state.success = action.payload;
        }
      )
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        updateUser.fulfilled,
        (
          state,
          action: PayloadAction<{ data: UserState["user"]; message: string }>
        ) => {
          state.loading = false;
          state.user = action.payload.data;
          state.success = action.payload.message;
        }
      )
      .addCase(
        updateUser.rejected,
        (state, action: PayloadAction<unknown | string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserState["user"]>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        fetchUser.rejected,
        (state, action: PayloadAction<unknown | string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      )
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserState["users"]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        fetchUsers.rejected,
        (state, action: PayloadAction<unknown | string>) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

const rootReducer = {
  user: userSlice.reducer,
};

export default rootReducer;
