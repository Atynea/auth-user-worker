import crypto from "crypto";

export function createHash(email: string): string {
  const salt = crypto.randomBytes(16);
  const digest = crypto
    .createHash("sha256")
    .update(email)
    .update(salt)
    .digest("hex");
  return `${digest}:${salt.toString("hex")}`;
}