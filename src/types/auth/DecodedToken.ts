export interface DecodedToken {
  //username
  sub: string;
  //role
  role: string;
  // issued at
  iat: number;
  // expiration
  exp: number;
}
