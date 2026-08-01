"use client";

export default function TaskCard({
  task,
  onClick,
}) {
  const colors = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700",
    Completed: "bg-indigo-100 text-indigo-700",
  };

  return (
    <button
      onClick={() => onClick(task)}
      className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between">

        <h3 className="text-sm font-semibold text-slate-900">
          {task.title}
        </h3>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <div className="mt-5 flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
          {task.assignee}
        </div>

        <span className="text-xs text-slate-500">
          {task.due}
        </span>

      </div>

    </button>
  );
}