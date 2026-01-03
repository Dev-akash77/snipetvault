
export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}


export interface TokenServicePort {
    generateToken(payload: TokenPayload): Promise<string>,
    verifyToken(token:string): Promise<TokenPayload | null>
}

export const TOKEN_SERVICE_TOKEN = Symbol('TOKEN_SERVICE_TOKEN');