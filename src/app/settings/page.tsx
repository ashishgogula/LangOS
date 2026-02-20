export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="surface-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Update profile details for your LangOS workspace.
        </p>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="company-name">
              Company Name
            </label>
            <input
              className="h-10 w-full rounded-md border border-slate-300 px-3 outline-none transition focus:border-slate-400"
              defaultValue="LangOS Enterprise"
              id="company-name"
              type="text"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="email-address">
              Email Address
            </label>
            <input
              className="h-10 w-full rounded-md border border-slate-300 px-3 outline-none transition focus:border-slate-400"
              defaultValue="admin@langos.demo"
              id="email-address"
              type="email"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-700"
            type="button"
          >
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
