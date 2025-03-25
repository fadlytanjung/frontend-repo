import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import env from "@/lib/env";
import { QueryParams } from "@/lib/types";
import { UserValues } from "@/model/users";

export const setLoading = createAction<boolean>("user/setLoading");
export const setError = createAction<string | null>("user/setError");
export const setSuccess = createAction<string | null>("user/setSuccess");

export const updateUser = createAsyncThunk(
  `user/update-user`,
  async (data: UserValues, thunkAPI) => {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/user/update-user-data`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        console.log(response);
        return thunkAPI.rejectWithValue(
          response.statusText ?? "Failed to update user data"
        );
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch-user",
  async (id: string, thunkAPI) => {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/user/fetch-user-data/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        return thunkAPI.rejectWithValue("Failed to fetch user data");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "user/fetch-users",
  async ({ page, size, q }: QueryParams, thunkAPI) => {
    try {
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_BASE_URL}/user/fetch-user-data?page=${page}&page_size=${size}&q=${q}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        return await response.json();
      } else {
        return thunkAPI.rejectWithValue("Failed to fetch user data");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
