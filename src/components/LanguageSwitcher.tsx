"use client";

import { useEffect, useState } from "react";

const locales = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "de", label: "Deutsch" },
    { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {
    const [currentLocale, setCurrentLocale] = useState("en");

    useEffect(() => {
        const saved = localStorage.getItem("lingo-locale");
        if (saved) {
            setCurrentLocale(saved);
        }
    }, []);

    const handleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setCurrentLocale(val);
        localStorage.setItem("lingo-locale", val);

        // Some Lingo implementations use cookie for SSR
        document.cookie = `NEXT_LOCALE=${val}; path=/; max-age=31536000`;

        // Reload to apply changes across the app
        window.location.reload();
    };

    return (
        <div className="flex items-center space-x-2 bg-white/10 p-2 rounded-lg backdrop-blur-md">
            <label htmlFor="locale-select" className="text-sm font-medium">Language:</label>
            <select
                id="locale-select"
                value={currentLocale}
                onChange={handleSwitch}
                className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500"
            >
                {locales.map((loc) => (
                    <option key={loc.code} value={loc.code}>
                        {loc.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
