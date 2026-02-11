import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

export const prisma: PrismaClient | null = isDatabaseConfigured
  ? global.prisma ||
    new PrismaClient({
      log: ["error", "warn"],
    })
  : null;

if (process.env.NODE_ENV !== "production" && prisma) {
  global.prisma = prisma;
}
