import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGoogleAuth } from "@/services/GoogleAuthService";
import { Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";

interface GoogleLoginButtonProps {
  onSuccess?: (user: any) => void;
  onError?: (error: string) => void;
  className?: string;
  disabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onSuccess,
  onError,
  className = "",
  disabled = false,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { initializeGoogleAuth, handleGoogleSignIn, authService } =
    useGoogleAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [inviteInfo, setInviteInfo] = useState<any>(null);
  const [isValidatingInvite, setIsValidatingInvite] = useState(false);

  // Get invite code from URL
  const inviteCode = searchParams.get("invite");

  useEffect(() => {
    const initAuth = async () => {
      try {
        const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
          setError(
            "Google Client ID not configured. Please contact your administrator.",
          );
          return;
        }

        await initializeGoogleAuth(clientId);

        // Set up credential handler
        authService.setCredentialHandler(async (response) => {
          setLoading(true);
          setError("");

          try {
            const result = await handleGoogleSignIn(
              response.credential,
              inviteCode || undefined,
            );

            if (result.success) {
              onSuccess?.(result.user);
              // Redirect to dashboard or home
              navigate("/admin");
            }
          } catch (error: any) {
            const errorMessage = error.message || "Authentication failed";
            setError(errorMessage);
            onError?.(errorMessage);
          } finally {
            setLoading(false);
          }
        });

        // Render Google button
        if (googleButtonRef.current) {
          authService.renderSignInButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            text: inviteCode ? "signup_with" : "signin_with",
            shape: "rectangular",
            width: 300,
          });
        }
      } catch (error: any) {
        setError(error.message || "Failed to initialize Google authentication");
      }
    };

    initAuth();
  }, [inviteCode]);

  // Validate invite if present
  useEffect(() => {
    const validateInvite = async () => {
      if (!inviteCode) return;

      setIsValidatingInvite(true);
      try {
        const result = await authService.validateInvite(inviteCode);
        if (result.success) {
          setInviteInfo(result.invite);
        } else {
          setError(result.error || "Invalid invite code");
        }
      } catch (error: any) {
        setError("Failed to validate invite code");
      } finally {
        setIsValidatingInvite(false);
      }
    };

    validateInvite();
  }, [inviteCode, authService]);

  if (disabled) {
    return (
      <Button disabled className={className}>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      {/* Invite Information */}
      {inviteCode && (
        <div className="space-y-3">
          {isValidatingInvite ? (
            <Alert className="border-blue-200 bg-blue-50">
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>Validating invitation...</AlertDescription>
            </Alert>
          ) : inviteInfo ? (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>You're invited!</strong>
                {inviteInfo.full_name && (
                  <span> Welcome, {inviteInfo.full_name}!</span>
                )}
                <br />
                Join as <strong>{inviteInfo.role}</strong>
                {inviteInfo.department && (
                  <span> in the {inviteInfo.department} department</span>
                )}
                .
                {inviteInfo.metadata?.invite_message && (
                  <div className="mt-2 text-sm">
                    "{inviteInfo.metadata.invite_message}"
                  </div>
                )}
              </AlertDescription>
            </Alert>
          ) : (
            error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )
          )}
        </div>
      )}

      {/* Access Control Message */}
      {!inviteCode && (
        <Alert className="border-orange-200 bg-orange-50">
          <Shield className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Invitation Required</strong>
            <br />
            Access to this platform is by invitation only. Please contact your
            administrator to request access.
          </AlertDescription>
        </Alert>
      )}

      {/* Google Sign-In Button */}
      {(inviteCode ? inviteInfo : false) && (
        <div className="flex flex-col items-center space-y-4">
          {loading && (
            <div className="flex items-center space-x-2 text-blue-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing you in...</span>
            </div>
          )}

          <div
            ref={googleButtonRef}
            className={`${loading ? "opacity-50 pointer-events-none" : ""} ${className}`}
          />

          {inviteCode && inviteInfo && (
            <p className="text-sm text-gray-600 text-center max-w-sm">
              By continuing, you agree to join{" "}
              {inviteInfo.metadata?.company_name || "the organization"} and
              accept their terms of service.
            </p>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && !isValidatingInvite && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* No Invite Code State */}
      {!inviteCode && (
        <div className="text-center py-8">
          <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Access Restricted
          </h3>
          <p className="text-gray-600 mb-4">
            This platform requires an invitation to join. If you believe you
            should have access, please contact your system administrator.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = "mailto:admin@yourcompany.com";
            }}
          >
            Contact Administrator
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
