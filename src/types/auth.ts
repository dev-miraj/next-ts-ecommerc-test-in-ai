export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Session {
  user: User;
  expires: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  name: string;
}
