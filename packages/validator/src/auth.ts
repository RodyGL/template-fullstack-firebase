import { Zod } from './zod-instance';

export const userLogIn = Zod.object({
  email: Zod.string().email(),
  password: Zod.string().min(1),
});

export type UserLogIn = Zod.infer<typeof userLogIn>;
