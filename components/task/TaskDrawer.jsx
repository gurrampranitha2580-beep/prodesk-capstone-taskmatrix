"use client";

export default function TaskDrawer({
  open,
  task,
  onClose,
}) {
  if (!open || !task) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
      />

      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl">

        <div className="border-b border-gray-200 p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Task Details
            </h2>

            <button
              onClick={onClose}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>

          </div>

        </div>

        <div className="flex-1 overflow-y-auto p-6">

          <div>

            <label className="text-sm font-medium text-gray-600">
              Title
            </label>

            <input
              defaultValue={task.title}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
            />

          </div>

          <div className="mt-6">

            <label className="text-sm font-medium text-gray-600">
              Description
            </label>

            <textarea
              rows={5}
              defaultValue="Add implementation details here..."
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
            />

          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div>

              <label className="text-sm font-medium text-gray-600">
                Status
              </label>

              <select className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2">

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

              <select className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2">

                <option>High</option>

                <option>Medium</option>

                <option>Low</option>

              </select>

            </div>

          </div>

          <div className="mt-6">

            <label className="text-sm font-medium text-gray-600">
              Due Date
            </label>

            <input
              type="date"
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"
            />

          </div>

          <div className="mt-8">

            <h3 className="mb-4 font-semibold">
              Activity
            </h3>

            <div className="space-y-4 text-sm text-gray-600">

              <p>Sarah created this task.</p>

              <p>Alex moved it to Review.</p>

              <p>You viewed this task.</p>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-200 p-6">

          <button className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}