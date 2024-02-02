export interface AuthState {
  authenticated: boolean;
  clientToken?: ClientTokenResponse;
  auth?: ClientTokenResponse;
}

export interface ClientTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  access_token_expires?: Date;
}
