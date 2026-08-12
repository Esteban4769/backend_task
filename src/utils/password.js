import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

const KEY_LENGTH = 64;

export const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH);

  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (password, storedHash) => {
  const [salt, key] = storedHash.split(":");

  if (!salt || !key) {
    return false;
  }

  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = await scryptAsync(password, salt, KEY_LENGTH);

  if (derivedKey.length !== keyBuffer.length) {
    return false;
  }

  return timingSafeEqual(keyBuffer, derivedKey);
};
