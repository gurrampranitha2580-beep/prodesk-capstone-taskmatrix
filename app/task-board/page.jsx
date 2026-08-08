"use client";

import { Suspense,useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ProtectedLayout from "@/components/layout/ProtectedLayout";
import BoardColumn from "@/components/task/BoardColumn";
import TaskDrawer from "@/components/task/TaskDrawer";
import { supabase } from "@/services/supabase/client";


function TaskBoardContent() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project");
  const newTask = searchParams.get("newTask");

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    if (!projectId) {
      setError("No project was selected.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    const { data, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", projectId)
      .eq("uid", user.id)
      .order("created_at", { ascending: false });

    if (taskError) {
      setError(taskError.message);
      setLoading(false);
      return;
    }

    setTasks(data || []);
    setLoading(false);
  }

  
  useEffect(() => {
    loadTasks();
  }, [projectId]);

  useEffect(() => {
    if (newTask === "true" && projectId) {
      setSelectedTask(null);
      setDrawerOpen(true);
    }
  }, [newTask, projectId]);

  function getBoardData() {
    const columns = [
      {
        id: "todo",
        title: "To Do",
        tasks: [],
      },
      {
        id: "progress",
        title: "In Progress",
        tasks: [],
      },
      {
        id: "review",
        title: "Review",
        tasks: [],
      },
      {
        id: "done",
        title: "Done",
        tasks: [],
      },
    ];

    tasks.forEach((task) => {
      const column = columns.find(
        (item) => item.title === task.status
      );

      if (column) {
        column.tasks.push({
          ...task,
          due: task.due_date || "No due date",
          assignee: task.assignee || "—",
        });
      }
    });

    return columns;
  }

  function handleTaskCreated(task) {
    setTasks((current) => [task, ...current]);
  }

  function handleNewTask() {
    setSelectedTask(null);
    setDrawerOpen(true);
  }

  if (loading) {
    return (
      <ProtectedLayout>
        <p className="text-sm text-gray-500">
          Loading tasks...
        </p>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
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

        <button
          onClick={handleNewTask}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          + New Task
        </button>

      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-4">
        {getBoardData().map((column) => (
          <BoardColumn
            key={column.id}
            column={column}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setDrawerOpen(true);
            }}
          />
        ))}
      </div>

      <TaskDrawer
        open={drawerOpen}
        task={selectedTask}
        projectId={projectId}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedTask(null);
        }}
        onTaskCreated={handleTaskCreated}
        onTaskUpdated={(updatedTask) => {
          setTasks((current) =>
            current.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            )
          );
        }}
        onTaskDeleted={(deletedId) => {
          setTasks((current) =>
            current.filter((task) => task.id !== deletedId)
          );
        }}
      />
    </ProtectedLayout>
  );
}
export default function TaskBoardPage() {
  return (
    <Suspense fallback={<div>Loading task board...</div>}>
      <TaskBoardContent />
    </Suspense>
  );
}