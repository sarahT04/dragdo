"use client"
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { Switch } from "@headlessui/react";

export default function ThemeSwitcher() {
    const [loading, setLoading] = useState(true);
    const { systemTheme, theme, setTheme } = useTheme()
    const currentSelectedTheme = theme === "system" ? systemTheme : theme;
    const [isDarkMode, setIsDarkMode] = useState(currentSelectedTheme === 'dark');
    useEffect(() => setLoading(false), [])
    if (loading) return null;
    const setLightMode = () => { setTheme('light'); setIsDarkMode(false); };
    const setDarkMode = () => { setTheme('dark'); setIsDarkMode(true) };
    return (
        <Switch
            checked={isDarkMode}
            onClick={isDarkMode ? setLightMode : setDarkMode}
            className="relative flex h-7 w-16 mx-auto rounded-full items-center dark-mode"
        >
            <span
                className="sr-only">
                Toggle dark mode
            </span>
            <span className={`inline-block h-6 w-6 transform transition 
           ${isDarkMode ? "translate-x-7" : "-translate-x-1"}`} >
                {
                    isDarkMode
                        ? <MoonIcon />
                        : <SunIcon />
                }
            </span>
        </Switch>
    )
}