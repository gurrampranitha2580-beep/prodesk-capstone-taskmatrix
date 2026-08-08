"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProtectedLayout from "@/components/layout/ProtectedLayout";
import ActivityCard from "@/components/dashboard/ActivityCard";
import DeadlineCard from "@/components/dashboard/DeadlineCard";
import QuickActions from "@/components/dashboard/QuickActions";
import StatCard from "@/components/dashboard/StatCard";
import TaskStatusChart from "@/components/dashboard/TaskStatusChart";
import { supabase } from "@/services/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", params.id)
        .eq("uid", user.id)
        .single();

      if (projectError) {
        setError(projectError.message);
        setLoading(false);
        return;
      }

      const { data: taskData, error: taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq("project_id", params.id)
        .eq("uid", user.id)
        .order("created_at", { ascending: false });

      if (taskError) {
        setError(taskError.message);
        setLoading(false);
        return;
      }

      setProject(projectData);
      setTasks(taskData || []);
      setLoading(false);
    }

    if (params.id) {
      loadProject();
    }
  }, [params.id]);

  if (loading) {
    return (
      <ProtectedLayout>
        <p className="text-sm text-gray-500">
          Loading workspace...
        </p>
      </ProtectedLayout>
    );
  }

  if (error) {
    return (
      <ProtectedLayout>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </ProtectedLayout>
    );
  }

  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const overdueTasks = tasks.filter((task) => {
    if (!task.due_date || task.status === "Done") {
      return false;
    }

    return new Date(task.due_date) < new Date();
  }).length;

  return (
    <ProtectedLayout>
      <div className="mb-8 flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Workspace
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            {project.name}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {project.sprint} • Agile Project Dashboard
          </p>
        </div>

        <button
          onClick={() => router.push(`/task-board?project=${project.id}`)}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Open Board
        </button>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Tasks"
          value={totalTasks}
          note="Tasks in this workspace"
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
          note="Currently active"
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          note={
            totalTasks > 0
              ? `${Math.round((completedTasks / totalTasks) * 100)}% completed`
              : "No tasks yet"
          }
        />

        <StatCard
          title="Overdue"
          value={overdueTasks}
          note="Past their due date"
        />

      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <DeadlineCard />
        </div>

        <QuickActions projectId={project.id} />

      </div>
      <div className="mt-8">
        <TaskStatusChart tasks={tasks} />
      </div>

      <div className="mt-5">
        <ActivityCard />
      </div>

    </ProtectedLayout>
  );
}