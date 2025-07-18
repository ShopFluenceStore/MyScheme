"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import type { SignInResponse } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/Button";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type MessageType = {
  type: "success" | "error" | "info" | "";
  text: string;
};

const AuthForm = ({ isSignUp = false }: { isSignUp?: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [isLogin, setIsLogin] = useState(!isSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: searchParams?.get("email") || "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType>({ type: "", text: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Check for callback errors (like OAuth errors)
  useEffect(() => {
    const error = searchParams?.get("error");
    if (error) {
      // Don't show error message for OAuth errors since NextAuth handles redirects
      console.error("Authentication error:", error);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Common validations for both login and signup
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(form.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one number, and one special character";
    }

    // Additional validations for signup
    if (!isLogin) {
      if (!form.name?.trim()) {
        newErrors.name = "Name is required";
      } else if (form.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }

      if (form.password && !form.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (form.password !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages and errors
    setMessage({ type: "", text: "" });
    setErrors({});

    // Validate form
    if (!validateForm()) return;

    setLoading(true);
    setMessage({
      type: "info",
      text: isLogin ? "Signing in..." : "Creating your account...",
    });

    try {
      if (isLogin) {
        // Handle Sign In
        const result = (await signIn("credentials", {
          redirect: false,
          email: form.email.trim().toLowerCase(),
          password: form.password,
          callbackUrl: "/",
        })) as SignInResponse | undefined;

        if (result?.error) {
          setMessage({
            type: "error",
            text: "Invalid email or password. Please try again."
          });
        } else {
          // NextAuth will automatically redirect to home page
          setMessage({
            type: "success",
            text: "Successfully logged in! Redirecting to home page..."
          });
        }
      } else {
        // Handle Sign Up
        setMessage({ type: "info", text: "Creating your account..." });

        try {
          const signupResponse = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: form.name.trim(),
              email: form.email.trim().toLowerCase(),
              password: form.password,
            }),
          });

          const signupData = await signupResponse.json();

          if (!signupResponse.ok) {
            throw new Error(signupData.message || "Failed to create account");
          }

          if (signupData.success) {
            // Show success message
            setMessage({
              type: "success",
              text: "Account created! Logging you in...",
            });

            // Auto-login after successful registration
            const signInResponse = await signIn("credentials", {
              redirect: false,
              email: form.email.trim().toLowerCase(),
              password: form.password,
              callbackUrl: "/",
            });

            if (signInResponse?.error) {
              console.error("Auto-login error:", signInResponse.error);
              setMessage({
                type: "error",
                text: "Failed to log in after registration. Please try again.",
              });
            } else {
              // NextAuth will handle the redirect to home page automatically
              setMessage({
                type: "success",
                text: "Successfully logged in! Redirecting..."
              });
            }
          } else {
            // Handle signup errors
            setMessage({
              type: "error",
              text:
                signupData.message || "Registration failed. Please try again.",
            });
          }
        } catch (error: unknown) {
          console.error("Signup error:", error);
          setMessage({
            type: "error",
            text:
              error instanceof Error
                ? error.message
                : "Failed to create account. Please try again.",
          });
        }
      }
    } catch (error: unknown) {
      console.error("Authentication error:", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
      });
    } finally {
      if (!isLogin || message.type !== "success") {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen pb-24 relative flex items-center justify-center bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] p-4">
      <div
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>
      <div className="w-full max-w-md z-10">
        <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-xl overflow-hidden border border-[var(--border)]">
          {/* Tabs */}
          <div className="flex border-b border-[var(--border)]">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                setMessage({ type: "", text: "" });
              }}
              className={`flex-1 py-4 px-6 text-center focus:outline-none hover:focus:outline-none rounded-none font-bold transition-colors cursor-pointer ${
                isLogin
                  ? "text-[var(--primary)] bg-[var(--bg-primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--text)] hover:bg-[var(--bg-primary)]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setMessage({ type: "", text: "" });
              }}
              className={`flex-1 py-4 px-6 text-center focus:outline-none hover:focus:outline-none rounded-none font-bold transition-colors cursor-pointer ${
                !isLogin
                  ? "text-[var(--primary)] bg-[var(--bg-primary)] border-b-2 border-[var(--primary)]"
                  : "text-[var(--text)] hover:bg-[var(--bg-primary)]"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-6 sm:p-8 bg-[var(--bg-primary)]">
            {/* Logo/Title */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-[var(--primary)]">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-[var(--text)] mt-2">
                {isLogin
                  ? "Sign in to your account"
                  : "Get started with your free account"}
              </p>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm flex items-center ${
                  message.type === "error"
                    ? "bg-[var(--error)] text-[var(--error-foreground)]"
                    : "bg-[var(--bg-secondary)] text-[var(--primary)]"
                }`}
              >
                {message.type === "error" ? (
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-[var(--bg-primary)] p-6 sm:p-8"
          >
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[var(--text)] mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full px-4 py-2.5 text-sm border ${
                    errors.name
                      ? "border-[var(--error)]"
                      : "border-[var(--border)]"
                  } rounded-lg bg-[var(--white)]/10 text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors`}
                  placeholder="John Doe"
                  disabled={loading}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-[var(--error)]">
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--text)] mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-2.5 text-sm border ${
                  errors.email
                    ? "border-[var(--error)]"
                    : "border-[var(--border)]"
                } rounded-lg bg-[var(--white)]/10 text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-colors`}
                placeholder="you@example.com"
                disabled={loading}
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-[var(--error)]">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--text)] mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className={`w-full px-4 py-2.5 text-sm border ${
                    errors.password
                      ? "border-[var(--error)]"
                      : "border-[var(--border)]"
                  } rounded-lg bg-[var(--white)]/10 text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent pr-10 transition-colors`}
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-[var(--text)] cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-[var(--error)]">
                  {errors.password}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[var(--text)] mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 text-sm border ${
                      errors.confirmPassword
                        ? "border-[var(--error)]"
                        : "border-[var(--border)]"
                    } rounded-lg bg-[var(--white)]/10 text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent pr-10 transition-colors`}
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text)] hover:text-[var(--text)] cursor-pointer"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-[var(--error)]">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isLogin ? "Signing in..." : "Creating account..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="bg-[var(--bg-primary)]">
            <div className="relative">
              <div className="absolute inset-0 pb-0 mb-0 flex items-center bg-[var(--bg-primary)]">
                <div className="w-full border-t border-[var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-full text-[var(--primary)]">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-center px-6 pb-6 bg-[var(--bg-primary)]">
              <button
                type="button"
                onClick={() => {
                  setMessage({ type: "", text: "" });
                  signIn("google", { callbackUrl: "/" });
                }}
                disabled={loading}
                className="w-full bg-[var(--bg-secondary)] flex justify-center text-[var(--text)] items-center gap-3 py-3 px-6 rounded-lg border border-[var(--border)]  hover:text-[var(--white)] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
              >
                <span className="sr-only">Continue with Google</span>
                <div className="flex items-center justify-center w-6 h-6">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <g>
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </g>
                  </svg>
                </div>
                <span className="text-sm font-medium text-[var(--text)]">
                  Continue with Google
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-[var(--text-secondary)]">
          <p>
            By {isLogin ? "signing in" : "signing up"}, you agree to our{" "}
            <Link
              href="/term-and-condition"
              className="text-[var(--primary)] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              className="text-[var(--primary)] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
