"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Activity, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { register as registerService } from "@/services/auth.service";
import useAuthStore from "@/store/auth.store";
import type { RegisterPatientPayload, RegisterDoctorPayload } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);

  const [role, setRole] = useState<"patient" | "doctor" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Common Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Patient Specific Fields
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [bloodGroup, setBloodGroup] = useState<RegisterPatientPayload["bloodGroup"]>("unknown");

  // Doctor Specific Fields
  const [specialization, setSpecialization] = useState("");
  const [hospital, setHospital] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;

    setError(null);
    setIsLoading(true);

    try {
      let payload: RegisterPatientPayload | RegisterDoctorPayload;

      if (role === "patient") {
        payload = {
          role: "patient",
          fullName,
          email,
          password,
          dateOfBirth,
          gender,
          bloodGroup,
        };
      } else {
        payload = {
          role: "doctor",
          fullName,
          email,
          password,
          specialization,
          hospital,
          licenseNumber,
          yearsOfExperience: Number(yearsOfExperience),
        };
      }

      const response = await registerService(payload);

      if (response.success) {
        setToken(response.token);
        setUser(response.user);
        router.push("/dashboard");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 
        "Failed to register. Please check your information and try again."
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
          Create your vault account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{" "}
          <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-400">
            sign in to an existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-card text-card-foreground border border-border px-4 py-8 shadow-xl rounded-2xl sm:px-10">
          
          {error && (
            <div className="mb-6 rounded-xl border border-destructive/25 bg-destructive/10 p-3 flex items-start gap-3 text-sm text-destructive">
              <AlertCircle className="size-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Select Role */}
          {!role && (
            <div className="space-y-6">
              <p className="text-center text-sm font-semibold text-muted-foreground">
                Please select your profile type to proceed:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Patient Role Button */}
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className="flex flex-col items-center justify-center p-6 border-2 border-border border-dashed rounded-2xl hover:border-emerald-500 hover:bg-emerald-500/5 transition-all text-center cursor-pointer group"
                >
                  <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                    <Activity className="size-6" />
                  </div>
                  <span className="font-bold text-foreground block">Patient</span>
                  <span className="text-xs text-muted-foreground mt-1">Upload records, receive AI summaries &amp; manage access.</span>
                </button>

                {/* Doctor Role Button */}
                <button
                  type="button"
                  onClick={() => setRole("doctor")}
                  className="flex flex-col items-center justify-center p-6 border-2 border-border border-dashed rounded-2xl hover:border-emerald-500 hover:bg-emerald-500/5 transition-all text-center cursor-pointer group"
                >
                  <div className="size-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                    <Shield className="size-6" />
                  </div>
                  <span className="font-bold text-foreground block">Doctor</span>
                  <span className="text-xs text-muted-foreground mt-1">Request permission and view patient-authorized reports securely.</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Fill Form based on Role */}
          {role && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Back to Role Selection */}
              <button
                type="button"
                onClick={() => setRole(null)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold cursor-pointer mb-2"
              >
                <ArrowLeft className="size-3.5" />
                Change profile type
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Common Fields */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-muted-foreground">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-muted-foreground">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                    placeholder="••••••••"
                  />
                </div>

                {/* Patient Fields */}
                {role === "patient" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground">Date of Birth</label>
                      <input
                        type="date"
                        required
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value as any)}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-muted-foreground">Blood Group</label>
                      <select
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value as any)}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      >
                        <option value="unknown">Unknown / Prefer not to say</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Doctor Fields */}
                {role === "doctor" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground">Specialization</label>
                      <input
                        type="text"
                        required
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                        placeholder="Cardiology"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground">Hospital Name</label>
                      <input
                        type="text"
                        required
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                        placeholder="City General Hospital"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground">License Number</label>
                      <input
                        type="text"
                        required
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                        placeholder="MD-12345"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-muted-foreground">Years of Experience</label>
                      <input
                        type="number"
                        min="0"
                        required
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                        className="flex h-10 w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                      />
                    </div>
                  </>
                )}

              </div>

              {/* Submit Button */}
              <div className="pt-4">
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
                      Creating account...
                    </>
                  ) : (
                    "Register & Create Vault"
                  )}
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
