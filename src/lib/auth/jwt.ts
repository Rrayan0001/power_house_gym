import { jwtVerify, SignJWT, type JWTPayload } from "jose";
import { ADMIN_SESSION_MAX_AGE_SECONDS } from "@/lib/auth/constants";

const encoder = new TextEncoder();

export type AdminSessionPayload = JWTPayload & {
  role: "admin";
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!secret) {
    throw new Error("AUTH_SECRET or ADMIN_PASSWORD is not configured");
  }
  return encoder.encode(secret);
}

export async function signAdminSessionToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE_SECONDS}s`)
    .sign(getAuthSecret());
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getAuthSecret());
    if (payload.role !== "admin") {
      return null;
    }
    return payload as AdminSessionPayload;
  } catch {
    return null;
  }
}
