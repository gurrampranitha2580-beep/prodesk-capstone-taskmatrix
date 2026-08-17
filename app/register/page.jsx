"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabase/client";
import AuthBanner from "@/components/auth/AuthBanner";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setErrorMessage("");
    setSuccessMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          fullName: formData.name,
          role: "Team Member",
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }
    setSuccessMessage("Account created successfully.");
    setTimeout(() => {
      router.push("/login");
    }, 1000);  
  }

  return (
    
  <main className="flex h-screen items-center justify-center bg-slate-100 p-6">
      <div className="flex h-[650px] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Left */}

        <AuthBanner
        heading={
        <>
        Build better
        <br />
        software,
        <br />
        together.
        </>
        }
        description="Create your workspace, invite your team and manage projects from planning to release."/>

        {/* Right */}

        <section className="flex flex-1 items-center justify-center p-10">

          <div className="w-full max-w-sm">

            <h2 className="text-3xl font-bold text-slate-900">
              Create Account
            </h2>

            <p className="mt-2 text-slate-500">
              Start managing your projects today.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-6"
            >

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  required
                />

              </div>

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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
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
                  placeholder="Minimum 6 characters"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-600"
                  required
                />

              </div>
              {errorMessage && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {successMessage}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

            </form>

            <div className="my-8 flex items-center">

              <div className="h-px flex-1 bg-slate-200"></div>

              <span className="px-4 text-xs uppercase tracking-wider text-slate-400">
                Already registered?
              </span>

              <div className="h-px flex-1 bg-slate-200"></div>

            </div>

            <Link
              href="/login"
              className="block rounded-xl border border-slate-300 py-3 text-center font-medium transition hover:bg-slate-50"
            >
              Sign In
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}