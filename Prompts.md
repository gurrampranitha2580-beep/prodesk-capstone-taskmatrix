
The following prompts were used during the planning and architecture phase to refine the project scope and technical decisions.

1. I'm on the Frontend track. Given the assignment's core modules (Kanban, task assignment, deadlines, priority tags, role management, activity feed), what MVP feature set best fits a frontend-only implementation without a real backend?

2. The assignment doesn't explicitly require project CRUD. Can the application still feel like a Jira/Asana-style project management tool using one seeded workspace instead of full Create/Edit/Delete functionality? What are the trade-offs?

3. Should user permissions be limited to Admin, Project Manager, and Team Member, or should job functions such as Developer and QA remain separate from access-control roles?

4. The assignment requires role management and an activity feed. Can these be implemented as behavior across existing screens instead of dedicated pages while still satisfying the requirements?

5. Given multiple interconnected domains (authentication, projects, tasks, users, activity, and UI state), does Redux Toolkit provide a better architecture than Zustand for this application? What are the architectural trade-offs?

6. Design a Redux store structure and matching mock API endpoints for a frontend-only application where the activity feed can be filtered by project, task, and user without duplicating logic.

7. Recommend a modern SaaS dashboard layout for an Agile project management application that prioritizes usability, responsive design, and clear sprint tracking while keeping the MVP scope realistic.
   
8. Create a prompt that rewrites task descriptions into clear, concise, and professional project-management language while preserving the original intent.

9. Which loading states should be implemented to improve the user experience during asynchronous operations such as task creation, updates, deletion, and AI processing?

10. How can toast notifications replace native browser alerts to create a more polished and non-blocking user experience?

11. Perform a mobile responsiveness audit of the application. Which components should be prioritized for viewport optimization?

12. How can long assignee names be handled within Kanban task cards without breaking the layout?

13. What is the most effective way to implement empty-state components for empty task columns while maintaining a professional SaaS interface?
