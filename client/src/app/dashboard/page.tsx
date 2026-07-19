"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Activity,
  FileText,
  Upload,
  Key,
  Users,
  Cpu,
  User,
  LogOut,
  Calendar,
  Building,
  Award,
  Clock,
  Lock,
  Eye,
  FileSpreadsheet,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { buttonVariants } from "@/components/ui/button";
import UploadReportModal from "@/components/reports/UploadReportModal";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, isHydrated, logout } = useAuth();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    // CRITICAL: Wait for hydration before checking auth.
    // Without this, the page redirects before localStorage token is read on refresh.
    if (!isHydrated) return;
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isHydrated, isLoading, isAuthenticated, router]);

  // Show loading spinner while hydrating OR fetching /auth/me
  if (!isHydrated || isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Activity className="size-10 text-emerald-500 animate-pulse mb-4" />
        <p className="text-sm font-semibold text-muted-foreground">
          Hydrating your secure vault...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 text-center">
        <Shield className="size-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Please sign in to access your encrypted healthcare records.
        </p>
        <Link
          href="/login"
          className={buttonVariants({
            variant: "default",
            className: "bg-emerald-600 hover:bg-emerald-500 text-white",
          })}
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // ── Type-narrow once using the role discriminant ──────────────────────────
  const isPatient = user.role === "patient";
  const patient = isPatient ? user : null; // PatientProfile | null
  const doctor = !isPatient ? user : null; // DoctorProfile | null

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans">

      {/* ─── Dashboard Header ─── */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <Shield className="size-6 text-emerald-500" />
              <span className="text-lg tracking-tight text-foreground">
                HealthVault <span className="text-emerald-500 font-extrabold">AI</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {isPatient ? "Patient Portal" : "Doctor Portal"}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors py-1.5 px-3 rounded-lg border border-border bg-background hover:bg-muted"
              >
                <LogOut className="size-3.5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Dashboard Body ─── */}
      <main className="flex-1 py-8 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, {user.fullName}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isPatient
                ? "Manage your medical records, AI summaries, and doctor access permissions."
                : "View authorized patient records and generate AI-powered clinical summaries."}
            </p>
          </div>
          {isPatient && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className={buttonVariants({
                variant: "default",
                className:
                  "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 py-5 px-5 rounded-xl cursor-pointer",
              })}
            >
              <Upload className="size-4" />
              Upload Medical Report
            </button>
          )}
        </div>

        {/* ─── PATIENT DASHBOARD WORKSPACE ─── */}
        {patient && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Health Overview & Reports */}
            <div className="lg:col-span-8 space-y-8">

              {/* Health Overview Card */}
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="size-4 text-emerald-500" />
                  Health Overview
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-muted/20">
                    <span className="text-xs text-muted-foreground block mb-1">Blood Group</span>
                    <span className="text-lg font-bold text-foreground">
                      {patient.bloodGroup}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-muted/20">
                    <span className="text-xs text-muted-foreground block mb-1">Allergies</span>
                    <span className="text-sm font-medium text-foreground block truncate">
                      {patient.allergies.length > 0
                        ? patient.allergies.join(", ")
                        : "No known allergies"}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-muted/20">
                    <span className="text-xs text-muted-foreground block mb-1">Chronic Diseases</span>
                    <span className="text-sm font-medium text-foreground block truncate">
                      {patient.chronicDiseases.length > 0
                        ? patient.chronicDiseases.join(", ")
                        : "None reported"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Medical Reports Section */}
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <FileText className="size-4 text-teal-500" />
                    Medical Reports
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium">3 documents stored</span>
                </div>

                <div className="space-y-4">
                  {/* Report 1 */}
                  <div className="p-4 border border-border rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet className="size-10 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Comprehensive Metabolic Panel</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="size-3" /> July 18, 2026 &bull; Lab Result
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                        AI Summarized
                      </span>
                      <button className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1 py-4" })}>
                        <Eye className="size-3.5" />
                        View
                      </button>
                    </div>
                  </div>

                  {/* Report 2 */}
                  <div className="p-4 border border-border rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <FileText className="size-10 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Cardiology Assessment &amp; ECG</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="size-3" /> July 15, 2026 &bull; Diagnostics
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full">
                        Processing AI
                      </span>
                      <button className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1 py-4" })}>
                        <Eye className="size-3.5" />
                        View
                      </button>
                    </div>
                  </div>

                  {/* Report 3 */}
                  <div className="p-4 border border-border rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <FileText className="size-10 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Immunization History Update</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="size-3" /> July 10, 2026 &bull; Other
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <span className="text-[10px] font-bold bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 px-2.5 py-0.5 rounded-full">
                        No AI summary
                      </span>
                      <button className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1 py-4" })}>
                        <Eye className="size-3.5" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: AI Summary & Blockchain Permissions */}
            <div className="lg:col-span-4 space-y-8">

              {/* AI Summary Card */}
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Cpu className="size-4 text-emerald-500" />
                  AI Summary Panel
                </h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5">
                    <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2 uppercase tracking-wide">
                      AI Explanation: Metabolic Panel
                    </h4>
                    <p className="text-xs text-foreground leading-relaxed">
                      Your recent lab results indicate excellent blood glucose regulation and optimal
                      hydration. LDL cholesterol shows a minor increase compared to your previous
                      baseline metrics, suggesting focused dietary adaptations. All renal indicators
                      reside comfortably within the nominal standard bounds.
                    </p>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center">
                    Summaries are generated privately using the Google Gemini model.
                  </p>
                </div>
              </div>

              {/* Blockchain Permissions Card */}
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Key className="size-4 text-cyan-500" />
                  Midnight Access Permissions
                </h3>
                <div className="space-y-4">
                  <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Dr. Sarah Jenkins</h4>
                      <span className="text-[9px] text-muted-foreground">Cardiologist &bull; General Hospital</span>
                    </div>
                    <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="size-1 rounded-full bg-emerald-500" /> Granted
                    </span>
                  </div>

                  <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-semibold text-foreground">Dr. Michael Vance</h4>
                      <span className="text-[9px] text-muted-foreground">General Practitioner &bull; Med Clinic</span>
                    </div>
                    <span className="text-[9px] font-bold bg-zinc-500/10 text-zinc-700 dark:text-zinc-400 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="size-1 rounded-full bg-zinc-500" /> Revoked
                    </span>
                  </div>

                  <div className="p-3 border border-border bg-muted/30 rounded-xl">
                    <span className="text-[10px] font-bold text-foreground block mb-1">On-Chain Audit Sync</span>
                    <span className="text-[9px] text-muted-foreground font-mono block break-all">
                      Tx: 0x83f9ab7234cde319a31cef9a7c3905c104ab7efd93
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ─── DOCTOR PORTAL WORKSPACE ─── */}
        {doctor && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Doctor Profile & Active Patients */}
            <div className="lg:col-span-4 space-y-8">

              {/* Doctor Details */}
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <User className="size-4 text-emerald-500" />
                  Doctor Profile
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Building className="size-5 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Hospital Affiliate</span>
                      <span className="text-xs font-semibold text-foreground">{doctor.hospital}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="size-5 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Specialization</span>
                      <span className="text-xs font-semibold text-foreground">{doctor.specialization}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Clinical Experience</span>
                      <span className="text-xs font-semibold text-foreground">{doctor.yearsOfExperience} Years</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Lock className="size-5 text-muted-foreground shrink-0" />
                    <div>
                      <span className="text-[10px] text-muted-foreground block">Medical Registration</span>
                      <span className="text-xs font-mono font-semibold text-foreground">{doctor.licenseNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Authorizations */}
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Users className="size-4 text-teal-500" />
                  Authorized Patients
                </h3>
                <div className="space-y-3">
                  <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold block">John Doe</span>
                      <span className="text-[9px] text-muted-foreground">ID: HV-8924</span>
                    </div>
                    <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full">
                      Active Access
                    </span>
                  </div>
                  <div className="p-3 border border-border bg-muted/20 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold block">Alice Smith</span>
                      <span className="text-[9px] text-muted-foreground">ID: HV-2481</span>
                    </div>
                    <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-700 px-2 py-0.5 rounded-full">
                      Active Access
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Accessible Medical Records */}
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-2xl border border-border bg-card shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <FileText className="size-4 text-emerald-500" />
                    Authorized Patient Records
                  </h3>
                  <span className="text-xs text-muted-foreground font-medium">2 reports accessible</span>
                </div>

                <div className="space-y-4">
                  {/* Record 1 */}
                  <div className="p-4 border border-border rounded-xl bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet className="size-10 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Comprehensive Metabolic Panel</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Patient: <span className="font-semibold text-foreground">John Doe</span> &bull; July 18, 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1 py-4" })}>
                        <Eye className="size-3.5" />
                        View Report
                      </button>
                      <button className={buttonVariants({ variant: "default", className: "bg-emerald-600 text-white hover:bg-emerald-500 gap-1 py-4" })}>
                        <Cpu className="size-3.5" />
                        AI Summary
                      </button>
                    </div>
                  </div>

                  {/* Record 2 */}
                  <div className="p-4 border border-border rounded-xl bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <FileText className="size-10 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">ECG Diagnostics &amp; Cardiology Report</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Patient: <span className="font-semibold text-foreground">Alice Smith</span> &bull; July 12, 2026
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button className={buttonVariants({ variant: "outline", size: "sm", className: "gap-1 py-4" })}>
                        <Eye className="size-3.5" />
                        View Report
                      </button>
                      <button className={buttonVariants({ variant: "default", className: "bg-emerald-600 text-white hover:bg-emerald-500 gap-1 py-4" })}>
                        <Cpu className="size-3.5" />
                        AI Summary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        <UploadReportModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
      </main>
    </div>
  );
}
