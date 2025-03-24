import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateUser, fetchUser, setLoading, setError } from "./actions";

export interface UserState {
  data: Record<string, number | string> | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  data: null,
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
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<UserState["data"]>) => {
          state.loading = false;
          state.data = action.payload;
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
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserState["data"]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchUser.rejected,
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
