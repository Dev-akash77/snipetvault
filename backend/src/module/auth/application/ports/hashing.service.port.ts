export interface HashingServicePort {
  hashing(data: string): Promise<string >;
  compare(data: string, encrypted: string): Promise<boolean>;
}

export const HASHING_SERVICE_TOKEN = Symbol('HASHING_SERVICE_TOKEN');
