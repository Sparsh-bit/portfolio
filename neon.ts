import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  functions: {
    // slug: ^[a-z0-9]{1,20}$
    bookingapi: {
      name: "portfolio booking api",
      source: "server/index.ts",
      env: {
        ADMIN_SECRET: process.env.ADMIN_SECRET!,
      },
    },
  },
});
