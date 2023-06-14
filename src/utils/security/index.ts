import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function hash(str: string) {
  const saltNumber = Number(process.env.SALT_NUMBER) || 10;

  const salt = await bcrypt.genSalt(saltNumber);
  const hashedPassword = await bcrypt.hash(str, salt);

  return hashedPassword;
}

export async function compare(encrypted: string, string: string) {
  const isEqual = bcrypt.compare(string, encrypted);

  return isEqual;
}

export async function signJwt(
  payload: { [T: string]: any },
  options?: jwt.SignOptions | undefined
) {
  const opts = { ...options, expiresIn: '1d' } as SignOptions;
  return jwt.sign(payload, process.env.JWT_SECRETE as Secret, opts);
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE as Secret);

    const response = {
      valid: true,
      expired: false,
      decoded,
    };

    return response;
  } catch (e: any) {
    const response = {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
    return response;
  }
}
