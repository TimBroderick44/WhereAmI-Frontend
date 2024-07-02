export interface AuthContextType {
  isAuthenticated: boolean;
  role: string | null;
  userName: string | null;
  login: (token: string) => void;
  logout: () => void;
}
