"use client";

import ProtectedLayout from "@/components/layout/ProtectedLayout";

export default function ProfilePage() {
  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-6xl">

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="flex items-center gap-6">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-700">
              PG
            </div>

            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                Pranitha Gurram
              </h1>

              <p className="mt-1 text-gray-500">
                Frontend Developer
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Passionate about building clean, responsive web
                applications with React, Next.js and modern UI
                design.
              </p>

            </div>

          </div>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Projects
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              4
            </h2>

          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Tasks Completed
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              52
            </h2>

          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-gray-500">
              Team Members
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              8
            </h2>

          </div>

        </div>

        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="rounded-lg bg-gray-50 p-4">
              Completed Dashboard UI
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              Updated Task Board
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              Joined Sprint 3 Planning
            </div>

          </div>

        </div>

      </div>
    </ProtectedLayout>
  );
}