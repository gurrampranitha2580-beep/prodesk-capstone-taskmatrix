"use client";

export default function TaskCard({ task, onClick }) {
  return (
    <div
      onClick={() => onClick(task)}
      className="cursor-pointer rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <h3 className="line-clamp-2 font-semibold text-slate-900">
        {task.title}
      </h3>

      <div className="mt-3">
        <span className="inline-flex flex-wrap items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 break-all">
          {task.assignee}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span
          className={`rounded px-2 py-1 text-xs font-medium ${
            task.priority === "High"
            ? "bg-red-100 text-red-700"
            : task.priority === "Medium"
            ? "bg-amber-100 text-amber-700"
            : "bg-green-100 text-green-700"
          }`}
          >
          {task.priority}
        </span>
        
         <span className="text-xs text-gray-500">
          {task.due
          ? new Date(task.due).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
        : "No due date"}
        </span>
      </div>
    </div>
  );
}