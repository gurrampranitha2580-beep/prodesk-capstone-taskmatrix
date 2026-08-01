"use client";

import ProtectedLayout from "@/components/layout/ProtectedLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-6xl">

        <h1 className="text-5xl font-bold">
          Select Workspace
        </h1>

        <p className="mt-2 text-xl text-gray-500">
          Choose a project to continue
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

      </div>
    </ProtectedLayout>
  );
}