"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Menu, X, Activity } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Security", href: "#security" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Branding */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <Shield className="size-6 text-emerald-500" />
              <Activity className="size-5 text-teal-500 animate-pulse" />
              <span className="text-xl tracking-tight text-foreground">HealthVault <span className="text-emerald-500 font-extrabold">AI</span></span>
            </Link>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/login" 
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className={buttonVariants({ 
                variant: "default", 
                size: "sm", 
                className: "bg-emerald-600 text-white hover:bg-emerald-500 font-semibold" 
              })}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-4 space-y-4">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-border flex flex-col gap-2">
            <Link 
              href="/login" 
              onClick={() => setIsOpen(false)}
              className={buttonVariants({ variant: "outline", className: "w-full justify-center" })}
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              onClick={() => setIsOpen(false)}
              className={buttonVariants({ 
                variant: "default", 
                className: "w-full justify-center bg-emerald-600 hover:bg-emerald-500 text-white" 
              })}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
