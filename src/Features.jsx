export default function Features() {
  return (
    <section className="bg-white px-6 py-20 md:px-10">
      <div className="grid grid-cols-1 max-w-6xl mx-auto gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-900">
            Curated Tech Insights
          </h3>
          <p className="mt-2 text-slate-600">
            Get hand-picked software engineering articles and industry trends
            delivered directly to your inbox every Monday.
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-900">
            Zero Noise, Pure Code
          </h3>
          <p className="mt-2 text-slate-600">
            We filter out sponsor bloat and clickbait so you only spend time
            reading deep technical breakdowns.
          </p>
        </div>
        <div className="rounded-xl bg-slate-100 p-6">
          <h3 className="text-xl font-bold text-slate-900">
            Exclusive Code Snippets
          </h3>
          <p className="mt-2 text-slate-600">
            Access production-ready snippets and practical architecture patterns
            you can implement in your daily workflow.
          </p>
        </div>
      </div>
    </section>
  );
}