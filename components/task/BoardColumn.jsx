import TaskCard from "./TaskCard";

export default function BoardColumn({
  column,
  onTaskClick,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-sm font-semibold text-slate-800">
          {column.title}
        </h2>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
          {column.tasks.length}
        </span>

      </div>

      <div className="space-y-3">

  {column.tasks.length === 0 ? (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center">

      <p className="text-sm font-medium text-slate-600">
        No tasks yet
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Create a new task to get started.
      </p>

    </div>
  ) : (
    column.tasks.map((task) => (
      <TaskCard
        key={task.id}
        task={task}
        onClick={onTaskClick}
      />
    ))
  )}

</div>

    </div>
  );
}