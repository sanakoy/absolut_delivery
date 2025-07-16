import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // КОНТЕКСТ АВТОРИЗАЦИИ
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    // ПРОВЕРКА ВАЛИДНОСТИ ТОКЕНА
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .get("/api/auth/user/", {
          headers: { Authorization: `Token ${storedToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setToken(storedToken);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        });
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    // ВХОД В АККАУНТ
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    navigate("/deliveries");
  };

  const logout = () => {
    // ВЫХОД ИЗ АККАУНТА
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  // ХУК ДЛЯ ПОЛУЧЕНИЯ АВТОРИЗАЦИИ
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
