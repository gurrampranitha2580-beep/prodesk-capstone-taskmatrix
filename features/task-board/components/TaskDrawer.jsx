"use client";

export default function TaskDrawer({
  selectedTask,
  onClose,
}) {
  if (!selectedTask) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-96 flex-col border-l bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Task Details
        </h2>

        <button
          onClick={onClose}
          className="rounded border px-3 py-1"
        >
          Close
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <p className="text-sm text-gray-500">
            Title
          </p>

          <p className="font-semibold">
            {selectedTask.title}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Assignee
          </p>

          <p>
            {selectedTask.assignee}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Priority
          </p>

          <p>
            {selectedTask.priority}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <p>
            {selectedTask.status}
          </p>
        </div>
      </div>
    </div>
  );
}