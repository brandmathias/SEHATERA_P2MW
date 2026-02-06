'use client';

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function CustomThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-10 w-20 rounded-full bg-muted/20 animate-pulse" />;

  const isDark = resolvedTheme === "dark";

  return (
    <div 
      className="relative flex h-10 w-20 cursor-pointer items-center rounded-full bg-[#e5e7eb] dark:bg-[#1f2937] p-1 transition-all shadow-inner border border-gray-300 dark:border-gray-700"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {/* Background Icons */}
      <div className="flex w-full justify-between items-center px-2">
        <Sun className={cn("h-5 w-5 text-gray-400 transition-opacity", !isDark && "opacity-0")} />
        <Moon className={cn("h-5 w-5 text-gray-500 transition-opacity", isDark && "opacity-0")} />
      </div>

      {/* Toggle Circle (Thumb) */}
      <div
        className={cn(
          "absolute left-1 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 shadow-md transform",
          isDark 
            ? "translate-x-10 bg-slate-800 text-blue-300" 
            : "translate-x-0 bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
        )}
      >
        {isDark ? (
          <Moon className="h-5 w-5 fill-blue-300" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </div>
    </div>
  );
}
