"use client";

import { api } from "@/utils/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface UserRegister {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: UserLogin) => Promise<void>;
  register: (data: UserRegister) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkedMe, setCheckedMe] = useState(false);
  const router = useRouter();

  // Check if the user is logged in when the component mounts.
  useEffect(() => {
    if (checkedMe) return; // Prevent multiple checks
    const checkMe = async () => {
      try {
        const response = await api("/me", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setCheckedMe(true);
      }
    };
    checkMe();
  }, []);

  const login = async (data: UserLogin) => {
    const response = await api("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Erro ao fazer login");
    }

    const dataBody = await response.json();
    setUser(dataBody);
  };

  const register = async (data: UserRegister) => {
    const response = await api("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error || "Erro ao registrar");
    }
    // If registration is successful, log the user in
    await login(data);

  };

  const logout = async () => {
    await api("/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading: !checkedMe, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
