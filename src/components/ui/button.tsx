"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.style.cssText = `
        position:absolute;border-radius:50%;background:rgba(255,255,255,0.4);
        width:100px;height:100px;margin-left:-50px;margin-top:-50px;
        left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;
        animation:ripple 0.6s ease-out;pointer-events:none;
      `;
      e.currentTarget.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      onClick?.(e);
    };

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <button
          ref={ref}
          onClick={handleClick}
          className={cn(
            "relative overflow-hidden inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-full",
            variant === "primary" && "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white glow-blue",
            variant === "secondary" && "glass gradient-border text-[var(--text-primary)]",
            variant === "ghost" && "text-[var(--text-secondary)] hover:text-[var(--accent-primary)]",
            size === "sm" && "px-4 py-2 text-sm",
            size === "md" && "px-6 py-3 text-base",
            size === "lg" && "px-8 py-4 text-lg",
            className
          )}
          {...props}
        >
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";
