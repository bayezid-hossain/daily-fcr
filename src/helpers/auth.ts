import { jwtVerify } from 'jose';

interface UserJwtPayload {
  jti: string;
  iat: number;
  data: { mobile: string; id: string; isVerified: boolean };
}
export const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET!;
  if (!secret || secret.length === 0) {
    throw new Error('JWT_SECRET not set');
  }
  return secret;
};
export const verifyAuth = async (
  token: string
): Promise<UserJwtPayload | undefined> => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as unknown as UserJwtPayload;
  } catch (error: any) {
    throw new Error('Your token expired');
  }
};
