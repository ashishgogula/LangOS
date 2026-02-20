export default function BillingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <section className="surface-card p-6 sm:p-8">
        <p className="text-xs uppercase tracking-wide text-zinc-500">Billing</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">Plan and usage</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Placeholder billing surface for the demo shell.
        </p>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Pro Plan</h2>
            <p className="mt-1 text-sm text-zinc-600">Active subscription for LangOS workspace.</p>
          </div>
          <span className="badge-success">Active</span>
        </div>

        <dl className="mt-4 grid gap-4 text-sm text-zinc-700 sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500">Plan</dt>
            <dd className="mt-1 font-medium">Pro Monthly</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Renewal Date</dt>
            <dd className="mt-1 font-medium">March 20, 2026</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Seats</dt>
            <dd className="mt-1 font-medium">12</dd>
          </div>
          <div>
            <dt className="text-zinc-500">Billing Contact</dt>
            <dd className="mt-1 font-medium">admin@langos.demo</dd>
          </div>
        </dl>

        <div className="mt-6">
          <button className="button-secondary" type="button">
            Manage Payment Methods
          </button>
        </div>
      </section>
    </div>
  );
}
