"use client";

import { useEffect, useState } from "react";

import ProtectedLayout from "@/components/layout/ProtectedLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { supabase } from "@/services/supabase/client";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function loadProjects() {
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to view your projects.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        name,
        sprint,
        description,
        status,
        tasks(count)
      `)
      .eq("uid", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const projectData = data.map((project) => ({
      ...project,
      tasks: project.tasks?.[0]?.count || 0,
    }));

    setProjects(projectData);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function createWorkspace() {
    setCreating(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in to create a workspace.");
      setCreating(false);
      return;
    }

    const { error } = await supabase.from("projects").insert({
      name: "Website Redesign",
      sprint: "Sprint 3",
      description: "Main development workspace",
      status: "Active",
      uid: user.id,
    });

    if (error) {
      setError(error.message);
      setCreating(false);
      return;
    }

    await loadProjects();
    setCreating(false);
  }

  return (
    <ProtectedLayout>
      <h1 className="text-5xl font-bold">
        Select Workspace
      </h1>

      <p className="mt-2 text-xl text-gray-500">
        Choose a project to continue
      </p>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-10 text-sm text-gray-500">
          Loading projects...
        </p>
      ) : projects.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-semibold text-slate-900">
            No workspace yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create your first workspace to start managing tasks.
          </p>

          <button
            onClick={createWorkspace}
            disabled={creating}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {creating ? "Creating..." : "Create Workspace"}
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      )}
    </ProtectedLayout>
  );
}