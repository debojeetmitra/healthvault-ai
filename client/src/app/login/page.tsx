"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Activity, AlertCircle, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { login as loginService } from "@/services/auth.service";
import useAuthStore from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await loginService({ email, password, role });
      
      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        router.push("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Invalid email or password. Please verify your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-950">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
          <Shield className="size-8 text-emerald-500" />
          <Activity className="size-6 text-teal-500 animate-pulse" />
          <span className="text-2xl tracking-tight text-foreground">HealthVault <span className="text-emerald-500 font-extrabold">AI</span></span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground tracking-tight">
          Sign in to your vault
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link href="/register" className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
            create a new secure account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card text-card-foreground border border-border px-4 py-8 shadow-xl rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-6 rounded-xl border border-destructive/25 bg-destructive/10 p-3 flex items-start gap-3 text-sm text-destructive">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-sm font-semibold text-muted-foreground mb-2">
                I am signing in as a:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl">
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`py-2 text-sm font-medium rounded-lg transition-all ${
                    role === "patient"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole("doctor")}
                  className={`py-2 text-sm font-medium rounded-lg transition-all ${
                    role === "doctor"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Doctor
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-muted-foreground">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-muted-foreground">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${buttonVariants({
                  variant: "default",
                  className: "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 justify-center rounded-xl gap-2 cursor-pointer w-full"
                })} disabled:opacity-50`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
