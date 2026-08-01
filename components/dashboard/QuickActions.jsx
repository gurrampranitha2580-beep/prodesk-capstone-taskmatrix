"use client";

import { useRouter } from "next/navigation";

export default function QuickActions() {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Quick Actions
      </h2>

      <div className="space-y-3">

        <button
          onClick={() => router.push("/task-board")}
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          Open Task Board
        </button>

        <button
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Create Task
        </button>

        <button
          onClick={() => router.push("/profile")}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          View Profile
        </button>

      </div>

    </div>
  );
}