import Link from "next/link";
import { Shield, Activity, Lock, Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <Shield className="size-6 text-emerald-500" />
              <Activity className="size-5 text-teal-500 animate-pulse" />
              <span className="text-xl tracking-tight text-foreground">HealthVault <span className="text-emerald-500 font-extrabold">AI</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              HealthVault AI is a privacy-first, secure medical data repository utilizing Zero-Knowledge cryptography and blockchain authorization layers to protect your healthcare records.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Summaries
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Tech */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Technology</h3>
            <ul className="space-y-2">
              <li>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="size-3.5 text-teal-500" />
                  Midnight Blockchain
                </span>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Cpu className="size-3.5 text-emerald-500" />
                  Google Gemini AI
                </span>
              </li>
              <li>
                <Link href="#security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  ZKP Authorization
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Privacy & Contact</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  support@healthvault-ai.example
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} HealthVault AI. Built for secure decentralized medical access.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span>ZKP Privacy Shield Enabled</span>
            <span>&bull;</span>
            <span>HIPAA Inspired Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
