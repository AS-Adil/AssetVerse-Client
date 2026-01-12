import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext/ThemeContext";

const ThemeToggle = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="btn btn-ghost btn-circle"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon size={20} className="text-info" />
      ) : (
        <Sun size={20} className="text-warning" />
      )}
    </button>
  );
};

export default ThemeToggle;
