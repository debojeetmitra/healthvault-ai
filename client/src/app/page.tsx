import Link from "next/link";
import { 
  ShieldCheck, 
  BrainCircuit, 
  LockKeyhole, 
  FileText, 
  Upload, 
  Key, 
  Users, 
  ChevronRight,
  Database,
  ArrowRight,
  Eye,
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-background text-foreground">
      {/* Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* ─── Hero Section ────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-400 to-cyan-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Hero Content */}
              <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
                <div className="inline-flex items-center self-center lg:self-start gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="size-3.5" />
                  Powered by Midnight Blockchain
                </div>
                
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
                  Your health records. <br />
                  <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                    Decentralized &amp; Secure.
                  </span>
                </h1>
                
                <p className="max-w-2xl mx-auto lg:mx-0 text-lg text-muted-foreground leading-relaxed">
                  HealthVault AI is a privacy-first platform that allows patients to securely store medical records, obtain instant AI-powered medical jargon summaries, and control doctor access using cryptographic blockchain permissions.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link 
                    href="/register" 
                    className={buttonVariants({ 
                      variant: "default", 
                      size: "lg", 
                      className: "bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-2 py-6 px-6 rounded-xl" 
                    })}
                  >
                    Create Your Vault
                    <ArrowRight className="size-4" />
                  </Link>
                  <Link 
                    href="#features" 
                    className={buttonVariants({ 
                      variant: "outline", 
                      size: "lg", 
                      className: "border-border hover:bg-muted font-medium py-6 px-6 rounded-xl" 
                    })}
                  >
                    Learn How It Works
                  </Link>
                </div>
              </div>

              {/* Visual Mockup - Interactive Dashboard Preview */}
              <div className="lg:col-span-6 flex justify-center w-full">
                <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl p-6 select-none">
                  
                  {/* Mockup Header */}
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">JD</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">John Doe</h4>
                        <p className="text-xs text-muted-foreground">Patient ID: HV-8924</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/10 px-2 py-0.5 text-xs font-medium text-teal-600 dark:text-teal-400">
                      <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
                      Vault Encrypted
                    </span>
                  </div>

                  {/* Mockup Records List */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Health Records</h5>
                    
                    {/* Record Card 1 */}
                    <div className="p-3 border border-border rounded-xl bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="size-8 text-emerald-500" />
                        <div>
                          <p className="text-xs font-medium text-foreground">Blood_Panel_Report.pdf</p>
                          <span className="text-[10px] text-muted-foreground">Uploaded 2 hours ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                          AI Explained
                        </span>
                      </div>
                    </div>

                    {/* Record Card 2 */}
                    <div className="p-3 border border-border rounded-xl bg-muted/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="size-8 text-emerald-500" />
                        <div>
                          <p className="text-xs font-medium text-foreground">Chest_XRay_Summary.pdf</p>
                          <span className="text-[10px] text-muted-foreground">Uploaded 1 day ago</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[9px] font-semibold bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                          Pending AI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Active Permission Panel Mock */}
                  <div className="mt-5 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Permissions</h5>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="size-3" /> Midnight Sync Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-emerald-500" />
                        <span className="text-xs font-medium text-foreground">Dr. Sarah Jenkins</span>
                      </div>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md">
                        Access Granted
                      </span>
                    </div>
                  </div>

                  {/* Absolute Background Accent for Mockup */}
                  <div className="absolute right-0 bottom-0 -z-10 translate-y-1/4 translate-x-1/4 size-32 bg-emerald-500/10 rounded-full blur-2xl" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Features Section ────────────────────────────────────────────────────── */}
        <section id="features" className="py-24 border-t border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Advanced Features Built for Privacy and Simplicity
              </h2>
              <p className="text-lg text-muted-foreground">
                HealthVault AI bridges modern artificial intelligence and decentralized ledger tech to transform patient autonomy.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Feature 1 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all">
                <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <BrainCircuit className="size-6" />
                </div>
                <h3 className="text-lg font-bold">AI Report Summaries</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Understand your health instantly. Our Google Gemini API integration translates complex clinical vocabulary into clear, everyday language.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all">
                <div className="size-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-2">
                  <Database className="size-6" />
                </div>
                <h3 className="text-lg font-bold">Secure Medical Storage</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All clinical PDF records, prescriptions, and lab tests are saved using Cloudinary storage parameters, ensuring they remain encrypted at rest.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all">
                <div className="size-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2">
                  <LockKeyhole className="size-6" />
                </div>
                <h3 className="text-lg font-bold">Blockchain Access Control</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Use Midnight blockchain smart permissions. Grant, deny, or revoke access to specific documents for individual doctors instantly.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col gap-4 p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all">
                <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <ShieldCheck className="size-6" />
                </div>
                <h3 className="text-lg font-bold">Audit Transparency</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every consent modification generates a transaction hash. Rest easy knowing you have an immutable record of exactly who has read your files.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ─── How It Works Section ─────────────────────────────────────────────────── */}
        <section id="how-it-works" className="py-24 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How HealthVault AI Works
              </h2>
              <p className="text-lg text-muted-foreground">
                A simple workflow keeping patients in the driver's seat of their own medical records.
              </p>
            </div>

            {/* Steps Workflow */}
            <div className="relative">
              <div className="absolute top-1/2 left-4 right-4 hidden lg:block h-0.5 bg-border -translate-y-1/2 -z-10" />
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center bg-background p-4 rounded-xl">
                  <div className="size-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shadow-lg mb-6">
                    <Upload className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">1. Upload Report</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Patient uploads medical documents (PDFs, images, labs) to their private vault.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center bg-background p-4 rounded-xl">
                  <div className="size-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-bold shadow-lg mb-6">
                    <BrainCircuit className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">2. AI Simplification</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    The backend triggers AI analysis, creating a clean summary of key metrics and conditions.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center bg-background p-4 rounded-xl">
                  <div className="size-16 rounded-full bg-cyan-600 text-white flex items-center justify-center text-lg font-bold shadow-lg mb-6">
                    <Key className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">3. Define Access</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Patient creates authorization rules recorded securely on Midnight Blockchain.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center bg-background p-4 rounded-xl">
                  <div className="size-16 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-bold shadow-lg mb-6">
                    <Users className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">4. Doctor Review</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Authorized doctors login and view reports securely under ZKP validation criteria.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ─── Security Section ────────────────────────────────────────────────────── */}
        <section id="security" className="py-24 border-t border-border bg-emerald-950/5 dark:bg-emerald-950/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  Cryptographic Trust
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Privacy-first from the ground up
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Unlike traditional medical portals where data is held inside siloed provider databases, HealthVault AI uses decentralized ledger infrastructure to give patients absolute custody of access tokens.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-1">
                      <span className="text-[10px] font-bold">Z</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Zero Knowledge Cryptography</h4>
                      <p className="text-xs text-muted-foreground">Prove permission rules are satisfied without exposing sensitive medical data details on public logs.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="size-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-1">
                      <span className="text-[10px] font-bold">B</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Permission Immutability</h4>
                      <p className="text-xs text-muted-foreground">Consent logs are anchored on-chain. Doctors can inspect reports only when a valid cryptographic permission token is active.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex justify-center">
                {/* Visual Security Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
                  
                  {/* Card 1 */}
                  <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-3">
                    <LockKeyhole className="size-6 text-emerald-500" />
                    <h4 className="font-semibold text-sm">HIPAA-Grade Protection</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      All files are encrypted client-side using industry-leading key wrapping mechanisms prior to storage.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-3">
                    <Users className="size-6 text-teal-500" />
                    <h4 className="font-semibold text-sm">Flexible Doctors Directory</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Search verified doctors in the medical network directory and link permissions instantly to their IDs.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-3">
                    <Eye className="size-6 text-cyan-500" />
                    <h4 className="font-semibold text-sm">Revoke on Demand</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Change your mind at any point. Revoking permissions immediately invalidates read authority on that document.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-3">
                    <BrainCircuit className="size-6 text-emerald-500" />
                    <h4 className="font-semibold text-sm">Secure AI Scans</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      AI translation is processed under strict privacy constraints, with no patient identifiers forwarded to external servers.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
