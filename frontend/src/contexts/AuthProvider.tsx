import {
  createContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("jwt")
  );
  const navigate = useNavigate();
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);   

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");
    const data = await res.json();

    localStorage.setItem("jwt", data.token);
    setToken(data.token);
    navigate("/admin");

    startLogoutTimer(); // â° Start countdown after login
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    navigate("/admin-login");

    if (logoutTimer.current) {
      clearTimeout(logoutTimer.current);
      logoutTimer.current = null;
    }
  };

  const startLogoutTimer = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);

    logoutTimer.current = setTimeout(() => {
      logout();
    }, 30 * 60 * 1000); // 30 minutes
  };

  // Sync token between tabs
  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("jwt"));
    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  // Reset logout timer on activity
  useEffect(() => {
    if (!token) return;

    const resetTimer = () => startLogoutTimer();
    const events = ["click", "mousemove", "keydown"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    startLogoutTimer(); // in case of reload

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [token]);

  const value: AuthContextValue = {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

