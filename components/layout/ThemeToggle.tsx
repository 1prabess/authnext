"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      <Sun className="hidden dark:block w-5 h-5  text-black dark:text-white" />
      <Moon className="block dark:hidden w-5 h-5  text-black  dark:text-white" />
    </button>
  );
};

export default ThemeToggle;
