export default function AuthBanner({
  heading,
  description,
}) {
  return (
    <section className="hidden w-[48%] flex-col justify-between bg-gradient-to-br from-indigo-50 to-white p-10 lg:flex">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            T
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              TaskMatrix
            </h2>

            <p className="text-sm text-slate-500">
              Workspace
            </p>
          </div>
        </div>

        <h1 className="mt-12 text-5xl font-bold leading-tight text-slate-900">
          {heading}
        </h1>

        <p className="mt-8 max-w-lg text-lg leading-8 text-slate-600">
          {description}
        </p>
      </div>

      <div>
        <p className="text-sm text-slate-400">
          © 2026 TaskMatrix
        </p>
      </div>
    </section>
  );
}