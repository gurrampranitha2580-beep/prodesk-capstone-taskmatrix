"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TaskStatusChart({ tasks }) {
  const statusCounts = tasks.reduce(
    (counts, task) => {
      if (task.status === "To Do") {
        counts.toDo += 1;
      }

      if (task.status === "In Progress") {
        counts.inProgress += 1;
      }

      if (task.status === "Review") {
        counts.review += 1;
      }

      if (task.status === "Done") {
        counts.done += 1;
      }

      return counts;
    },
    {
      toDo: 0,
      inProgress: 0,
      review: 0,
      done: 0,
    }
  );

  const chartData = [
    {
      status: "To Do",
      tasks: statusCounts.toDo,
    },
    {
      status: "In Progress",
      tasks: statusCounts.inProgress,
    },
    {
      status: "Review",
      tasks: statusCounts.review,
    },
    {
      status: "Done",
      tasks: statusCounts.done,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Tasks by Status
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Current task distribution in this workspace.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="status" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              name="Tasks"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}