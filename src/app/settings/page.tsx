export default function SettingsPage() {
  return (
    <div className="section-stack mx-auto max-w-4xl">
      <section className="surface-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Workspace profile</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Placeholder settings surface for the demo shell.
        </p>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="dotted-list">
          <div className="p-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="company-name">
              Company Name
            </label>
            <input
              className="input-base"
              defaultValue="LangOS Enterprise"
              id="company-name"
              type="text"
            />
          </div>

          <div className="p-4">
            <label className="mb-1 block text-sm font-medium text-zinc-700" htmlFor="email-address">
              Email Address
            </label>
            <input
              className="input-base"
              defaultValue="admin@langos.demo"
              id="email-address"
              type="email"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="button-primary" type="button">
            Save Changes
          </button>
        </div>
      </section>
    </div>
  );
}
