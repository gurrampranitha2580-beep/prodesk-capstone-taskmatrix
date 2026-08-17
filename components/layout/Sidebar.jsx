"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  FolderKanban,
  LayoutDashboard,
  KanbanSquare,
  User,
  LogOut,
} from "lucide-react";

import { supabase } from "@/services/supabase/client";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [dashboardHref, setDashboardHref] = useState("/projects");
  const [taskBoardHref, setTaskBoardHref] = useState("/task-board");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function loadDashboardProject() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("id")
        .eq("uid", user.id)
        .limit(1)
        .single();

      if (!error && data) {
        setDashboardHref(`/projects/${data.id}`);
        setTaskBoardHref(`/task-board?project=${data.id}`);
      }
    }

    loadDashboardProject();
  }, []);

  const links = [
    {
      name: "Projects",
      href: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Dashboard",
      href: dashboardHref,
      icon: LayoutDashboard,
    },
    {
      name: "Task Board",
      href: taskBoardHref,
      icon: KanbanSquare,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const isActive = (link) => {
    if (link.name === "Projects") {
      return pathname === "/projects";
    }

    if (link.name === "Dashboard") {
      return pathname.startsWith("/projects/");
    }

    if (link.name === "Task Board") {
      return pathname.startsWith("/task-board");
    }

    if (link.name === "Profile") {
      return pathname.startsWith("/profile");
    }

    return false;
  };

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-200 bg-white p-2 shadow md:hidden"
      >
        ☰
      </button>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white p-5 transition-transform duration-300 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex`}
      >
        <div>
          <div className="mb-10">
            <h1 className="text-2xl font-bold text-indigo-600">
              TaskMatrix
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Agile Workspace
            </p>
          </div>

          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive(link)
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon size={18} />

                  <span>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-slate-200 pt-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={18} />

            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}