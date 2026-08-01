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

        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
          />
        ))}

      </div>

    </div>
  );
}