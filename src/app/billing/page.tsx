export default function BillingPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold tracking-tight">Billing & Subscriptions</h1>

            <div className="bg-white dark:bg-gray-900 shadow-sm border dark:border-gray-800 rounded-xl p-6 max-w-2xl text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Pro Plan Active</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Your account is currently on the Pro tier. You have full access to Lingo's internationalization features.
                </p>
                <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-medium py-2 px-6 rounded-lg transition-colors">
                    Manage Payment Methods
                </button>
            </div>
        </div>
    );
}
