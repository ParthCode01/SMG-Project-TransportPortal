import { UserCircle, LogOut, Moon, Sun } from "lucide-react";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <header className="h-18 bg-white dark:bg-gray-900 flex items-center justify-between px-8 border-b border-brand-border dark:border-gray-700 transition-colors">
      {/* Left: Title + Accent */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-brand"></div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transport Portal
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Dashboard Overview
          </p>
        </div>
      </div>

      {/* Right: User + Theme Toggle */}
      <div className="flex items-center gap-5">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 hover:text-brand transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="hidden sm:block">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        {/* User Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand-light text-brand">
          <UserCircle size={22} />
          <span className="text-sm font-medium">Admin</span>
        </div>

        {/* Logout */}
        <button className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 hover:text-red-600 transition">
          <LogOut size={18} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
