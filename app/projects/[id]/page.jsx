"use client";

import { useRouter } from "next/navigation";

import ProtectedLayout from "@/components/layout/ProtectedLayout";
import ActivityCard from "@/components/dashboard/ActivityCard";
import DeadlineCard from "@/components/dashboard/DeadlineCard";
import QuickActions from "@/components/dashboard/QuickActions";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <ProtectedLayout>
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold text-indigo-600">
              Workspace
            </p>

            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Website Redesign
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sprint 3 • Agile Project Dashboard
            </p>
          </div>

          <button
            onClick={() => router.push("/task-board")}
            className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Open Board
          </button>

        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          
          <StatCard
            title="Total Tasks"
            value="24"
            note="+4 tasks this sprint"
          />
          <StatCard
            title="In Progress"
            value="8"
            note="Currently active"
          />
          <StatCard
            title="Completed"
            value="12"
            note="50% completed"
          />
          <StatCard
            title="Deadline"
            value="4"
            note="Due this week"
          />
          


        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <DeadlineCard />
          </div>

          <QuickActions />

        </div>

        <div className="mt-5">
          <ActivityCard />
        </div>

      </div>
    </ProtectedLayout>
  );
}