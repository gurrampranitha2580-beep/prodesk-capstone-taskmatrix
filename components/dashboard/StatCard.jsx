import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Timer,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  note,
}) {
  function getIcon() {
    switch (title) {
      case "Total Tasks":
        return <ListTodo size={20} />;

      case "In Progress":
        return <Timer size={20} />;

      case "Completed":
        return <CheckCircle2 size={20} />;

      case "Deadlines":
        return <Clock3 size={20} />;

      default:
        return <ListTodo size={20} />;
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-3 text-xs text-slate-500">
            {note}
          </p>

        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {getIcon()}
        </div>

      </div>

    </div>
  );
}