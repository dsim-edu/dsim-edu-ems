import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_API_SECRET: z.string().min(1),
    ADMIN_USERNAME: z.string().min(1),
    ADMIN_PASSWORD: z.string().min(1),
    JWT_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
