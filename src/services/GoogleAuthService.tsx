import { useUser } from "@/contexts/UserContext";

interface GoogleCredential {
  credential: string;
  select_by: string;
}

interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email: string;
  email_verified: boolean;
}

export class GoogleAuthService {
  private static instance: GoogleAuthService;
  private isInitialized = false;

  static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  async initialize(clientId: string): Promise<void> {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: this.handleCredentialResponse.bind(this),
            auto_select: false,
            cancel_on_tap_outside: true,
          });
          this.isInitialized = true;
          resolve();
        } else {
          reject(new Error("Google Identity Services failed to load"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load Google script"));
      document.head.appendChild(script);
    });
  }

  private handleCredentialResponse(response: GoogleCredential) {
    // This will be set by the component using the service
    if (this.onCredentialReceived) {
      this.onCredentialReceived(response);
    }
  }

  private onCredentialReceived?: (response: GoogleCredential) => void;

  setCredentialHandler(handler: (response: GoogleCredential) => void) {
    this.onCredentialReceived = handler;
  }

  renderSignInButton(
    element: HTMLElement,
    options: {
      theme?: "outline" | "filled_blue" | "filled_black";
      size?: "large" | "medium" | "small";
      text?: "signin_with" | "signup_with" | "continue_with" | "signin";
      shape?: "rectangular" | "pill" | "circle" | "square";
      width?: number;
    } = {},
  ) {
    if (!this.isInitialized || !window.google?.accounts?.id) {
      console.error("Google Identity Services not initialized");
      return;
    }

    window.google.accounts.id.renderButton(element, {
      theme: options.theme || "outline",
      size: options.size || "large",
      text: options.text || "continue_with",
      shape: options.shape || "rectangular",
      width: options.width || 300,
    });
  }

  async parseCredential(credential: string): Promise<GoogleUserInfo> {
    try {
      // Decode JWT token (Note: In production, validate the token server-side)
      const payload = JSON.parse(atob(credential.split(".")[1]));
      return payload as GoogleUserInfo;
    } catch (error) {
      throw new Error("Failed to parse Google credential");
    }
  }

  async validateInvite(inviteCode: string): Promise<any> {
    try {
      const response = await fetch(
        `/api/superadmin/invite-manager.php?action=validate&invite_code=${inviteCode}`,
      );
      return await response.json();
    } catch (error) {
      throw new Error("Failed to validate invite");
    }
  }

  async acceptInviteAndRegister(
    inviteCode: string,
    googleUserData: GoogleUserInfo,
  ): Promise<any> {
    try {
      const response = await fetch("/api/superadmin/invite-manager.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "accept",
          invite_code: inviteCode,
          google_user_data: googleUserData,
        }),
      });
      return await response.json();
    } catch (error) {
      throw new Error("Failed to accept invite and register");
    }
  }

  signOut() {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.disableAutoSelect();
    }
  }
}

// Hook for using Google Auth in React components
export const useGoogleAuth = () => {
  const { login } = useUser();
  const authService = GoogleAuthService.getInstance();

  const initializeGoogleAuth = async (clientId: string) => {
    try {
      await authService.initialize(clientId);
    } catch (error) {
      console.error("Failed to initialize Google Auth:", error);
      throw error;
    }
  };

  const handleGoogleSignIn = async (
    credential: string,
    inviteCode?: string,
  ) => {
    try {
      const userInfo = await authService.parseCredential(credential);

      if (inviteCode) {
        // Registration flow with invite
        const result = await authService.acceptInviteAndRegister(
          inviteCode,
          userInfo,
        );

        if (result.success) {
          // Create user profile for the context
          const userProfile = {
            id: result.user_id,
            fullName: userInfo.name,
            email: userInfo.email,
            phone: "",
            jobTitle: "",
            department: "",
            timezone: "UTC",
            bio: "",
            avatar: userInfo.picture,
            initials: userInfo.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2),
            role: "user" as const,
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

          login(userProfile);

          // Store session token
          localStorage.setItem("session_token", result.session_token);
          localStorage.setItem("session_expires", result.expires_at);

          return { success: true, user: userProfile };
        } else {
          throw new Error(result.error || "Registration failed");
        }
      } else {
        // Regular login flow (check if user exists or allow domain emails)
        const allowedDomainsStr =
          import.meta.env.VITE_ALLOWED_DOMAINS ||
          "calicutspicetraders.com,gmail.com";
        const allowedDomains = allowedDomainsStr
          .split(",")
          .map((d) => d.trim());
        const emailDomain = userInfo.email.split("@")[1];

        if (!allowedDomains.includes(emailDomain)) {
          throw new Error(
            `Access restricted to authorized email domains (${allowedDomains.join(", ")}). Please contact your administrator.`,
          );
        }

        // For existing users or domain emails, create/login user
        const userProfile = {
          id: `user_${userInfo.sub}`,
          fullName: userInfo.name,
          email: userInfo.email,
          phone: "",
          jobTitle: userInfo.email.includes("calicutspicetraders.com")
            ? "Team Member"
            : "",
          department: userInfo.email.includes("calicutspicetraders.com")
            ? "Operations"
            : "",
          timezone: "UTC",
          bio: "",
          avatar: userInfo.picture,
          initials: userInfo.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2),
          role: userInfo.email.includes("calicutspicetraders.com")
            ? "admin"
            : ("user" as const),
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

        login(userProfile);

        // Store session info
        const sessionToken = `session_${Date.now()}_${userInfo.sub}`;
        const expiresAt = new Date(
          Date.now() + 24 * 60 * 60 * 1000,
        ).toISOString(); // 24 hours

        localStorage.setItem("session_token", sessionToken);
        localStorage.setItem("session_expires", expiresAt);

        return { success: true, user: userProfile };
      }
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error;
    }
  };

  return {
    initializeGoogleAuth,
    handleGoogleSignIn,
    authService,
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          disableAutoSelect: () => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default GoogleAuthService;
