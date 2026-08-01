"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/projects");
  }

  return (
    <main className="flex h-screen items-center justify-center bg-slate-100 p-6">
      <div className="flex h-[650px] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      
        {/* Left Side */}

        <section className="hidden w-[48%] flex-col justify-between bg-gradient-to-br from-indigo-50 to-white p-10 lg:flex">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
                T
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  TaskMatrix
                </h2>

                <p className="text-sm text-slate-500">
                  Workspace
                </p>

              </div>

            </div>

            <h1 className="mt-12 text-5xl font-bold leading-tight text-slate-900">
              From backlog
              <br />
              to release,
              <br />
              in one workspace.
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-600">
              Plan sprints, assign work and track progress
              with one clean workspace built for software teams.
            </p>

          </div>

          <div>
            <p className="text-sm text-slate-400">
              © 2026 TaskMatrix
              </p>
          </div>

        </section>

        {/* Right Side */}

        <section className="flex flex-1 items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue to your workspace.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
                  required
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
                  required
                />

              </div>

              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-slate-600">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

            </form>

            <div className="my-8 flex items-center">

              <div className="h-px flex-1 bg-slate-200"></div>

              <span className="px-4 text-xs uppercase tracking-wider text-slate-400">
                New here?
              </span>

              <div className="h-px flex-1 bg-slate-200"></div>

            </div>

            <Link
              href="/register"
              className="block rounded-xl border border-slate-300 py-3 text-center font-medium transition hover:bg-slate-50"
            >
              Create Account
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}