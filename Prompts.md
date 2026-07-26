 ## AI Prompting Process

The following prompts were used during the planning and architecture phase to refine the project scope and technical decisions.

1. I'm on the Frontend track. Given the assignment's core modules (Kanban, task assignment, deadlines, priority tags, role management, activity feed), what MVP feature set best fits a frontend-only implementation without a real backend?

2. The assignment doesn't explicitly require project CRUD. Can the application still feel like a Jira/Asana-style project management tool using one seeded workspace instead of full Create/Edit/Delete functionality? What are the trade-offs?

3. Should user permissions be limited to Admin, Project Manager, and Team Member, or should job functions such as Developer and QA remain separate from access-control roles?

4. The assignment requires role management and an activity feed. Can these be implemented as behavior across existing screens instead of dedicated pages while still satisfying the requirements?

5. Given multiple interconnected domains (authentication, projects, tasks, users, activity, and UI state), does Redux Toolkit provide a better architecture than Zustand for this application? What are the architectural trade-offs?

6. Design a Redux store structure and matching mock API endpoints for a frontend-only application where the activity feed can be filtered by project, task, and user without duplicating logic.

7. Recommend a modern SaaS dashboard layout for an Agile project management application that prioritizes usability, responsive design, and clear sprint tracking while keeping the MVP scope realistic.
