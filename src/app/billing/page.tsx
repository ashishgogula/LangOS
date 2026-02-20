export default function BillingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="surface-card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Billing</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage your plan and payment details.
        </p>
      </section>

      <section className="surface-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-lg font-medium text-slate-900">Pro Plan</h2>
            <p className="mt-1 text-sm text-slate-600">Active subscription for LangOS workspace.</p>
          </div>
          <span className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1 text-sm text-slate-700">
            Active
          </span>
        </div>

        <dl className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Plan</dt>
            <dd className="mt-1 font-medium">Pro Monthly</dd>
          </div>
          <div>
            <dt className="text-slate-500">Renewal Date</dt>
            <dd className="mt-1 font-medium">March 20, 2026</dd>
          </div>
          <div>
            <dt className="text-slate-500">Seats</dt>
            <dd className="mt-1 font-medium">12</dd>
          </div>
          <div>
            <dt className="text-slate-500">Billing Contact</dt>
            <dd className="mt-1 font-medium">admin@langos.demo</dd>
          </div>
        </dl>

        <div className="mt-6">
          <button
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            type="button"
          >
            Manage Payment Methods
          </button>
        </div>
      </section>
    </div>
  );
}
