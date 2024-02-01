export interface AuthState {
    authenticated: boolean,
    clientToken?: clientTokenResponse,
    auth?: any
}

export interface clientTokenResponse {
    access_token: string,
    expires_in: number,
    token_type: string
};