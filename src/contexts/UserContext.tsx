import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  timezone: string;
  bio: string;
  avatar?: string;
  initials: string;
  role: "user" | "admin" | "superadmin";
  preferences: {
    language: string;
    currency: string;
    dateFormat: string;
    timeFormat: string;
    defaultDashboard: string;
  };
  isOnline: boolean;
  lastActive: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
  isAuthenticated: boolean;
  login: (userData: User) => void;
}

const defaultUser: User = {
  id: "user_" + Date.now(),
  fullName: "",
  email: "",
  phone: "",
  jobTitle: "",
  department: "",
  timezone: "UTC",
  bio: "",
  initials: "",
  role: "user",
  preferences: {
    language: "en",
    currency: "USD",
    dateFormat: "dd-mm-yyyy",
    timeFormat: "24h",
    defaultDashboard: "overview",
  },
  isOnline: true,
  lastActive: new Date().toISOString(),
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user_data");
    const authToken = localStorage.getItem("auth_token");
    const hasBeenLoggedOut = localStorage.getItem("user_logged_out") === "true";

    // Only restore user if they haven't explicitly logged out
    if (savedUser && authToken && !hasBeenLoggedOut) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error loading user data:", error);
        logout();
      }
    }
  }, []);

  // Save user data to localStorage whenever user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      localStorage.setItem("user_data", JSON.stringify(user));
    }
  }, [user, isAuthenticated]);

  const generateInitials = (fullName: string): string => {
    if (!fullName.trim()) return "??";
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const login = (userData: User) => {
    const userWithInitials = {
      ...userData,
      initials: generateInitials(userData.fullName),
      isOnline: true,
      lastActive: new Date().toISOString(),
    };

    setUser(userWithInitials);
    setIsAuthenticated(true);
    localStorage.setItem("auth_token", "authenticated");
    localStorage.setItem("user_data", JSON.stringify(userWithInitials));
    // Clear logout flag when user logs in
    localStorage.removeItem("user_logged_out");
  };

  const updateUser = (userData: Partial<User>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...userData,
      initials: userData.fullName
        ? generateInitials(userData.fullName)
        : user.initials,
      lastActive: new Date().toISOString(),
    };

    setUser(updatedUser);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user_data");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("superadmin_authenticated");
    localStorage.removeItem("session_token");
    localStorage.removeItem("session_expires");
    // Set logout flag to prevent automatic user recreation
    localStorage.setItem("user_logged_out", "true");
  };

  // Create default user if none exists and user tries to access the app
  const ensureUser = () => {
    if (!user && !isAuthenticated) {
      const newUser: User = {
        ...defaultUser,
        id: "user_" + Date.now(),
        fullName: "User", // Will be updated when they fill profile
        email: "user@company.com", // Will be updated when they fill profile
        initials: "U",
      };
      login(newUser);
    }
  };

  // Auto-create user if accessing app without login (but not after explicit logout)
  useEffect(() => {
    // Only create default user if:
    // 1. Not already authenticated
    // 2. Not on login page
    // 3. No explicit logout happened (check if localStorage was intentionally cleared)
    const hasBeenLoggedOut = localStorage.getItem("user_logged_out") === "true";

    if (
      !isAuthenticated &&
      !window.location.pathname.includes("/login") &&
      !hasBeenLoggedOut
    ) {
      ensureUser();
    }
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        logout,
        isAuthenticated,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
