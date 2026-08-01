const activity = [
  "Sarah moved Login Screen to Review",
  "Alex completed Landing Page",
  "Mike assigned a new backend task",
];

export default function ActivityCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Recent Activity
      </h2>

      <div className="space-y-3">

        {activity.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            {item}
          </div>
        ))}

      </div>

    </div>
  );
}