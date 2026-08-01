"use client";

import TaskCard from "./TaskCard";

export default function KanbanColumn({
  title,
  tasks,
  onSelectTask,
}) {
  return (
    <div className="min-h-[500px] rounded-lg bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-semibold">
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onSelectTask={onSelectTask}
          />
        ))}
      </div>
    </div>
  );
}