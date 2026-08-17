"use client";

import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";
import { supabase } from "@/services/supabase/client";

export default function TaskDrawer({
  open,
  task,
  projectId,
  onClose,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}) {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY

  );
  
  const model = genAI.getGenerativeModel({
    model: "gemini-3.5-flash-lite",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Medium",
    assignee: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "To Do",
        priority: task.priority || "Medium",
        assignee: task.assignee || "",
        dueDate: task.due_date || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        assignee: "",
        dueDate: "",
      });
    }

    setError("");
    setShowDeleteConfirm(false);
  }, [task, open]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }
  async function rewriteWithAI() {
    if (!formData.description.trim()) {
      setAiError("Please enter a description first.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    try {
      
      const result = await model.generateContent(`
        You are a project manager.
       
        Rewrite the following task as a single professional sentence.
        Rules:
        - Keep the original meaning.
        - Return only one rewritten version.
        - Do not create multiple options.
        - Do not use bullet points.
        - Do not add explanations.
        - Keep the response under 60 words.
        - Make it sound like a task written in a project management tool.
        
        Task:
        ${formData.description}
      `);
      const response = await result.response;
      const improvedText = response.text();
      setFormData((current) => ({
        ...current,
        description: improvedText,
      }));
    } catch (error) {
      setAiError("Unable to rewrite the description.");
    }
    setAiLoading(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      assignee: formData.assignee.trim(),
      due_date: formData.dueDate || null,
    };

    if (task) {
      const { data, error: updateError } = await supabase
        .from("tasks")
        .update(taskData)
        .eq("id", task.id)
        .eq("uid", user.id)
        .eq("project_id", projectId)
        .select()
        .single();

      setLoading(false);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      onTaskUpdated(data);
      toast.success("Task updated successfully.");
      onClose();
      return;
    }

    const { data, error: insertError } = await supabase
      .from("tasks")
      .insert({
        ...taskData,
        project_id: projectId,
        uid: user.id,
      })
      .select()
      .single();

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    onTaskCreated(data);
    
    toast.success("Task created successfully.");

    onClose();
  }

  async function handleDelete() {
    if (!task) {
      return;
    }

    setDeleting(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("You must be logged in.");
      setDeleting(false);
      return;
    }

    const { error: deleteError } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id)
      .eq("uid", user.id)
      .eq("project_id", projectId);

    if (deleteError) {
      setError(deleteError.message);
      setDeleting(false);
      return;
    }

    setDeleting(false);
    setShowDeleteConfirm(false);

    onTaskDeleted(task.id);
    toast.success("Task deleted successfully.");
    onClose();
  }

  if (!open) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <form
        onSubmit={handleSubmit}
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
      >
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {task ? "Edit Task" : "New Task"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {task
                  ? "Update the task details."
                  : "Add a task to this workspace."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-600">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-600">
                Description
              </label>
              <button
                type="button"
                onClick={rewriteWithAI}
                disabled={aiLoading}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-60">
                {aiLoading
                  ? "Rewriting..."
                  : "✨ Rewrite with AI"}
              </button>
            </div>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Add implementation details..."
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"/>
                {aiError && (
                  <p className="mt-2 text-sm text-red-600">
                    {aiError}
                  </p>
                )}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Review</option>
                <option>Done</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-600">
              Assignee
            </label>

            <input
              type="text"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Team member"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-600">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 p-6">
          {task && (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting || loading}
              className="mb-3 w-full rounded-lg border border-red-200 py-3 font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              Delete Task
            </button>
          )}

          <button
            type="submit"
            disabled={loading || deleting}
            className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : task
                ? "Save Changes"
                : "Create Task"}
          </button>
        </div>
      </form>

      {showDeleteConfirm && task && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 p-6">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Delete Task?
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete "{task.title}"? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}