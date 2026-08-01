const items = [
  {
    title: "Login API Integration",
    due: "Tomorrow",
  },
  {
    title: "Homepage Review",
    due: "Friday",
  },
  {
    title: "Deployment Checklist",
    due: "Monday",
  },
];

export default function DeadlineCard() {
  return (
    
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Upcoming Deadlines
      </h2>

      <div className="space-y-4">

        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
          >
            <span className="font-medium">
              {item.title}
            </span>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600">
              {item.due}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}