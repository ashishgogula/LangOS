import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
    return (
        <nav className="flex justify-between items-center bg-white shadow-sm border-b px-6 py-4 dark:bg-gray-900 dark:border-gray-800 transition-colors">
            <div className="flex items-center space-x-8">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">LangOS</div>
                <div className="flex space-x-6 text-sm font-medium text-gray-600 dark:text-gray-300">
                    <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Dashboard</Link>
                    <Link href="/billing" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Billing</Link>
                    <Link href="/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Settings</Link>
                </div>
            </div>
            <div>
                <LanguageSwitcher />
            </div>
        </nav>
    );
}
