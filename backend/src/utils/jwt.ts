import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenPayload, UserRole } from '../middleware/auth';
import { logger } from './logger';

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET'] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`${envVar} is not defined in environment variables`);
  }
}

const JWT_SECRET = process.env['JWT_SECRET'] as string;
const JWT_EXPIRES_IN = process.env['JWT_EXPIRES_IN'] || '7d';
const JWT_COOKIE_EXPIRES_IN = process.env['JWT_COOKIE_EXPIRES_IN']
  ? parseInt(process.env['JWT_COOKIE_EXPIRES_IN'], 10)
  : 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Custom SignOptions that allows expiresIn to be a string or number
interface CustomSignOptions extends Omit<SignOptions, 'expiresIn' | 'algorithm'> {
  expiresIn?: string | number;
  algorithm?: 'HS256';
  secret?: string;
}

interface TokenPayloadWithExp extends Omit<TokenPayload, 'exp' | 'iat'> {
  exp: number;
  iat: number;
}

/**
 * Parse a time string (e.g., '7d', '24h') to seconds
 */
const parseTimeToSeconds = (timeString: string): number => {
  const match = timeString.match(/^(\d+)([smhd])?$/);
  if (!match) return 60 * 60 * 24 * 7; // Default to 7 days if invalid format

  const value = parseInt(match[1], 10);
  const unit = match[2] || 's';
  
  const multipliers: Record<string, number> = {
    's': 1,
    'm': 60,
    'h': 60 * 60,
    'd': 60 * 60 * 24
  };
  
  return value * (multipliers[unit] || 1);
};

/**
 * Sign a JWT token with the given payload
 */
export const signToken = (
  payload: Omit<TokenPayload, 'iat' | 'exp'>,
  options: CustomSignOptions = {}
): string => {
  const secret = options.secret || JWT_SECRET;
  const expiresIn = options.expiresIn || JWT_EXPIRES_IN;
  
  // Create options object with algorithm and expiresIn as a number of seconds
  const expiresInSeconds = typeof expiresIn === 'string' 
    ? parseTimeToSeconds(expiresIn)
    : expiresIn;
    
  // Create a type-safe options object for jwt.sign
  // We need to manually construct the options to avoid TypeScript errors
  const jwtOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: expiresInSeconds
  };
  
  // Copy other options except 'expiresIn' and 'secret'
  Object.entries(options).forEach(([key, value]) => {
    if (key !== 'expiresIn' && key !== 'secret' && key !== 'algorithm') {
      (jwtOptions as any)[key] = value;
    }
  });

  return jwt.sign(payload, secret, jwtOptions);
};

/**
 * Verify a JWT token and return the decoded payload
 * @throws {JsonWebTokenError} If token is invalid
 */
export const verifyToken = (token: string, secret: string = JWT_SECRET): TokenPayload => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    logger.error('Token verification failed:', error);
    throw error;
  }
};

/**
 * Get the expiration time from a JWT token (in seconds since epoch)
 */
export const getTokenExpiration = (token: string): number => {
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) {
    throw new Error('Invalid token');
  }
  return (decoded.payload as TokenPayloadWithExp).exp;
};

/**
 * Check if a JWT token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const exp = getTokenExpiration(token);
    return Date.now() >= exp * 1000;
  } catch (error) {
    logger.error('Error checking token expiration:', error);
    return true;
  }
};

/**
 * Create a JWT token and set it as a cookie on the response
 */
export const createAndSendToken = (
  user: { id: string; email: string; role: UserRole; password?: string },
  statusCode: number,
  res: {
    cookie: (name: string, val: string, options: Record<string, any>) => any;
    status: (code: number) => any;
  }
) => {
  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieOptions = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES_IN),
    httpOnly: true,
    secure: process.env['NODE_ENV'] === 'production', // Only send over HTTPS in production
    sameSite: 'strict' as const,
  };

  // Create a safe user object without sensitive data
  const safeUser = { ...user };
  delete safeUser.password;

  res
    .status(statusCode)
    .cookie('jwt', token, cookieOptions)
    .json({
      status: 'success',
      token,
      data: {
        user: safeUser,
      },
    });
};
