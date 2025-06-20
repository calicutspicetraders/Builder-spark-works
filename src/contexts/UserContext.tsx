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

  // Debug logging to track state changes
  useEffect(() => {
    console.log("User state changed:", {
      user: user?.fullName || null,
      isAuthenticated,
    });
  }, [user, isAuthenticated]);

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
    console.log("Logout initiated"); // Debug log

    // Clear all React state immediately
    setUser(null);
    setIsAuthenticated(false);

    // Clear all localStorage keys that might contain user data
    const keysToRemove = [
      "user_data",
      "auth_token",
      "superadmin_authenticated",
      "session_token",
      "session_expires",
      "google_auth_state",
    ];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });

    // Set logout flag to prevent automatic user recreation
    localStorage.setItem("user_logged_out", "true");

    console.log("Logout completed, user should be null:", {
      user: null,
      isAuthenticated: false,
    });

    // Don't redirect here - let the Navigation component handle it
    // This allows for proper cleanup before redirect
  };

  // REMOVED: ensureUser function to prevent auto-login issues
  // Users must explicitly authenticate through Google OAuth or other methods

  // DISABLED: Auto-create user (this was preventing logout from working)
  // Users should explicitly authenticate rather than auto-creating accounts
  // useEffect(() => {
  //   const hasBeenLoggedOut = localStorage.getItem("user_logged_out") === "true";
  //   if (!isAuthenticated && !window.location.pathname.includes("/login") && !hasBeenLoggedOut) {
  //     ensureUser();
  //   }
  // }, [isAuthenticated]);

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
