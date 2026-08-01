"use client";

export default function TaskCard({ task, onSelectTask }) {
  return (
    <div
      onClick={() => onSelectTask(task)}
      className="cursor-pointer rounded-lg border bg-white p-4 shadow transition hover:shadow-md"
    >
      <h3 className="font-semibold">
        {task.title}
      </h3>

      <p className="mt-2 text-sm text-gray-600">
        Assignee: {task.assignee}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="rounded bg-gray-100 px-2 py-1 text-xs">
          {task.priority}
        </span>

        <span className="text-xs text-gray-500">
          {task.status}
        </span>
      </div>
    </div>
  );
}