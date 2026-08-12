import { createHmac, timingSafeEqual } from 'crypto';

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN_SECONDS = 60 * 60 * 24;

if (!SECRET) {
  throw new Error('JWT_SECRET is not set in the environment');
}

const base64url = (input) =>
  Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const base64urlDecode = (input) =>
  Buffer.from(input.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();

const sign = (data) =>
  createHmac('sha256', SECRET).update(data).digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

export const signToken = (payload) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + EXPIRES_IN_SECONDS,
  };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedBody = base64url(JSON.stringify(body));
  const signature = sign(`${encodedHeader}.${encodedBody}`);

  return `${encodedHeader}.${encodedBody}.${signature}`;
};

export const verifyToken = (token) => {
  if (typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedBody, signature] = parts;
  const expectedSignature = sign(`${encodedHeader}.${encodedBody}`);

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  let payload;
  try {
    payload = JSON.parse(base64urlDecode(encodedBody));
  } catch {
    return null;
  }

  if (typeof payload.exp === 'number' && Math.floor(Date.now() / 1000) > payload.exp) {
    return null;
  }

  return payload;
};
