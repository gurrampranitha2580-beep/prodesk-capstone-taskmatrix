"use client";

import { useState } from "react";

import ProtectedLayout from "@/components/layout/ProtectedLayout";
import BoardColumn from "@/components/task/BoardColumn";
import TaskDrawer from "@/components/task/TaskDrawer";
import { boardData } from "@/components/task/tasks";

export default function TaskBoardPage() {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold text-indigo-600">
              Website Redesign
            </p>

            
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Task Board
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sprint 3 Kanban Board
            </p>

          </div>

          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700">
            + New Task
          </button>

        </div>

        <div className="grid gap-5 lg:grid-cols-4">

          {boardData.map((column) => (
            <BoardColumn
              key={column.id}
              column={column}
              onTaskClick={setSelectedTask}
            />
          ))}

        </div>

      </div>

      <TaskDrawer
        open={selectedTask !== null}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />

    </ProtectedLayout>
  );
}