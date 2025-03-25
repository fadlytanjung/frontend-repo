import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().nonempty("Required!"),
  email: z.string().nonempty("Required!").email("Invalid email format"),
  age: z.number().nullable(),
  numberOfRents: z.number().nullable(),
  recentlyActive: z.date().nullable(),
  totalAverageWeightRatings: z.number().nullable(),
});

export type UserValues = z.infer<typeof UserSchema>;
