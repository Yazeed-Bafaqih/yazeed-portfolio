import { createContext, useContext, useState, useCallback, useEffect } from "react";

const AppToolsContext = createContext(null);

export function AppToolsProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const showToast = useCallback((message) => {
    setToast(message);
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, []);

  const copyText = useCallback(async (text, successMsg) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg ?? "Copied to clipboard");
      return true;
    } catch {
      showToast("Could not copy — try manually");
      return false;
    }
  }, [showToast]);

  return (
    <AppToolsContext.Provider
      value={{
        toast,
        showToast,
        copyText,
        paletteOpen,
        setPaletteOpen,
        openPalette: () => setPaletteOpen(true),
        closePalette: () => setPaletteOpen(false),
        theme,
        toggleTheme,
      }}
    >
      {children}
    </AppToolsContext.Provider>
  );
}

export function useAppTools() {
  const ctx = useContext(AppToolsContext);
  if (!ctx) throw new Error("useAppTools must be used within AppToolsProvider");
  return ctx;
}
