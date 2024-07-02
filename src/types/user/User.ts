
export interface User {
  username: string;
  password: string;
  roles: Role[];
}

export interface Role {
  name: string;
}
