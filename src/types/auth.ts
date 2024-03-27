export type ReqLogin = {
    // username: string;
    email: string;
    password: string;
  };
  
  export type ResLoginApi = {
    id: string;
    name: string;
    email: string;
    image_path: string;
    verified: number;
    is_admin: number;
    accessToken: string;
  };