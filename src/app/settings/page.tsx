export default function SettingsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>

            <div className="bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800 rounded-xl overflow-hidden max-w-2xl">
                <div className="p-6 border-b dark:border-gray-800">
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your account's profile details and email address.</p>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                        <input type="text" defaultValue="LangOS Enterprise" className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                        <input type="email" defaultValue="admin@langos.demo" className="w-full p-2 border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-800 flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
