"use client";

import { useRouter } from "next/navigation";

export default function ProjectCard({ project }) {
  const router = useRouter();

  const active = project.status === "Active";

  return (
    <div
      onClick={() => {
        if (active) {
          router.push(`/projects/${project.id}`);
        }
      }}
      className={`rounded-2xl border bg-white p-6 transition

      ${
        active
          ? "cursor-pointer border-indigo-500 hover:shadow-lg"
          : "opacity-60"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {project.name}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm

          ${
            active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {project.status}
        </span>
      </div>

      {active ? (
        <>
          <p className="mt-4 text-gray-500">
            {project.sprint} • {project.tasks} Tasks
          </p>

          <button className="mt-6 font-semibold text-indigo-600">
            Open Project →
          </button>
        </>
      ) : (
        <p className="mt-4 italic text-gray-400">
          {project.description}
        </p>
      )}
    </div>
  );
}