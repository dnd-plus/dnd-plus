import jwt from 'jwt-simple'

export type JwtPayload = {
  userId: string
}

const jwtSecret = process.env.JWT_SECRET as string

export function jwtDecode(token: string): JwtPayload {
  return jwt.decode(token, jwtSecret)
}

export function jwtEncode(payload: JwtPayload): string {
  return jwt.encode(payload, jwtSecret)
}
