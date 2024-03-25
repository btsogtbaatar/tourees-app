export declare module RegisterModule {
  export type RegisterStep = {
    email?: string;
    phone?: string;
    username?: string;
  };

  export type RegisterType = {
    email?: string;
    phone?: string;
    type?: string;
    username?: string;
    otp?: number | string;
  };
  export type User = {
    id: number;
    name: string;
    email?: string;
    phone?: string;
  };
}

export interface UsernameResponse {
  username: string;
}
