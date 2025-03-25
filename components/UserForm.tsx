"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, UserValues } from "@/model/users";
import { TextField, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { fetchUser, setError, setLoading, updateUser } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useLocalUid } from "./hooks/useLocalUid";
import UpdateButton from "./atoms/UpdateButton";
import dayjs from "dayjs";

export default function UserForm({
  id,
  title,
}: {
  id?: string;
  title?: string;
}) {
  const router = useRouter();
  const localUid = useLocalUid();
  const { control, handleSubmit, reset } = useForm<UserValues>({
    resolver: zodResolver(UserSchema),
    mode: "onChange",
    defaultValues: {
      id: "",
      name: "",
      email: "",
      age: 0,
      numberOfRents: 0,
      totalAverageWeightRatings: 0,
      recentlyActive: null,
    },
  });

  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((s) => s.user);

  const uid = id || localUid;

  useEffect(() => {
    if (uid) {
      dispatch(fetchUser(uid));
    }
  }, [uid, dispatch]);

  useEffect(() => {
    if (user && uid) {
      const { recentlyActive, ...rest } = user;
      reset({
        ...rest,
        id: uid as string,
        recentlyActive: recentlyActive ? dayjs(recentlyActive).toDate() : null,
      });
    }
  }, [uid, user, reset]);

  const onSubmit = (data: UserValues) => {
    dispatch(setLoading(true));

    const payload = {
      ...data,
    };

    dispatch(updateUser(payload))
      .then(() => {
        dispatch(setLoading(false));
        router.push("/users");
      })
      .catch((error) => {
        dispatch(
          setError(error instanceof Error ? error.message : "Update Failed")
        );
        dispatch(setLoading(false));
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400 }}
      className="flex flex-col gap-4"
    >
      <Typography variant="h6" mb={2}>
        {title || "User Login Information"}
      </Typography>

      <Controller
        name="id"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="ID"
            error={!!error?.message}
            disabled
            helperText={error?.message as string}
          />
        )}
      />
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="Name"
            error={!!error?.message}
            helperText={error?.message as string}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            label="Email"
            disabled={id === localUid}
            error={!!error?.message}
            helperText={error?.message as string}
          />
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e) => {
              field.onChange(Number(e.target.value));
            }}
            fullWidth
            label="Age"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!error?.message}
            helperText={error?.message as string}
          />
        )}
      />
      <Controller
        name="numberOfRents"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e) => {
              field.onChange(Number(e.target.value));
            }}
            fullWidth
            label="Number of Rents"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!error?.message}
            helperText={error?.message as string}
          />
        )}
      />
      <Controller
        name="recentlyActive"
        control={control}
        render={({ field: { value, ...fields }, fieldState: { error } }) => (
          <TextField
            {...fields}
            value={dayjs(value).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => {
              fields.onChange(dayjs(e.target.value).toDate());
            }}
            fullWidth
            label="Recently Active"
            type="datetime-local"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            error={!!error?.message}
            helperText={error?.message as string}
          />
        )}
      />
      <Controller
        name="totalAverageWeightRatings"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            onChange={(e) => {
              field.onChange(Number(e.target.value));
            }}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            label="Total Average Weight Ratings"
            type="number"
            error={!!error?.message}
            helperText={error?.message as string}
          />
        )}
      />
      {id && <UpdateButton loading={loading} />}
    </Box>
  );
}
