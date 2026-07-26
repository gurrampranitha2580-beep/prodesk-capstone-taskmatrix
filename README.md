# prodesk-capstone-taskmatrix

# TaskMatrix-* *From backlog to release, in one workspace.*

**Frontend Track Capstone Project**

TaskMatrix is an Agile project management application designed for software development teams. It helps teams manage project work from a single workspace where tasks are assigned, prioritized, tracked through a four-stage Kanban board (To Do, In Progress, Review, and Done), and monitored using project-specific dashboards and activity updates.

This project is being developed as part of the Prodesk Frontend Capstone. The focus is to build a responsive, well-structured interface that supports day-to-day sprint management while demonstrating modern frontend architecture, state management, and thoughtful UI/UX design.

---

# Project Goal

Software development teams often work on multiple tasks with different priorities, deadlines, and owners. As projects grow, it becomes difficult to quickly understand what is in progress, what is blocked, and what needs immediate attention.

TaskMatrix is designed to bring that information into one place. Users begin by selecting a project, review its current progress through a project dashboard, and manage work on a Kanban board where every task includes an assignee, priority level, due date, and status. The goal is to make everyday sprint management clear, organized, and easy to follow without adding unnecessary complexity.

---

# Target Users

TaskMatrix is primarily designed for software development teams that follow Agile workflows.

It is also suitable for:
- Startup development teams
- Student project teams
- Freelance development teams

The application supports three user roles:

- **Admin** – manages users, roles, and overall project access.
- **Project Manager** – plans work, assigns tasks, and monitors project progress.
- **Team Member** – updates assigned tasks and tracks day-to-day work.

---

# User Journey

After signing in, users are presented with a list of available projects. Selecting a project opens a project-specific dashboard that provides an overview of task progress, upcoming deadlines, recent activity, and team status.

From the dashboard, users move to the Kanban board to manage daily work. Tasks can be moved across four workflow stages (To Do, In Progress, Review, and Done), updated with priorities and due dates, and assigned to team members based on their role.

Every task update is reflected in the activity feed, allowing the team to stay informed about changes throughout the sprint.

---

# Core Features

## Priority 1 – MVP Features

These features form the core functionality of the application.

### Project Selection
- View available projects.
- Open a project to access its dashboard and Kanban board.

### Project Dashboard
- View project progress.
- Display task statistics.
- Track upcoming deadlines.
- View recent activity.
- Access quick navigation to project features.

### Kanban Board
- Organize tasks into four workflow stages:
  - To Do
  - In Progress
  - Review
  - Done
- Move tasks between stages using drag-and-drop interactions.

### Task Management
- Create, assign, and manage tasks throughout their lifecycle.
- Assign tasks to team members.
- Set task priority.
- Add due dates.
- Track task status.
- View task details.

### Role-Based Access
- Support three user roles:
  - Admin
  - Project Manager
  - Team Member
- Display role-specific actions and permissions throughout the interface.

### Activity Feed
- Record important project updates such as task assignments, status changes, and priority updates.

---

## Priority 2 – User Experience Enhancements

These features improve usability without changing the core workflow.

- Responsive layout for desktop, tablet, and mobile devices.
- Search and filter tasks.
- Profile page with user information and assigned work summary.
- Clear visual indicators for priorities, deadlines, and task status.

---

## Priority 3 – Future Scope

These features are planned after the MVP is completed.

- Multiple project management
- Calendar view
- File attachments
- GitHub integration
- In-app notifications
- AI-assisted task suggestions

---

# Technical Approach

TaskMatrix will be developed as a frontend application using technologies that support component-based development, predictable state management, and responsive user interfaces.

| Technology | Purpose |
|------------|---------|
| Next.js 15 (App Router) | Frontend framework, routing, and application structure |
| JavaScript (ES6+) | Application logic and interactivity |
| Tailwind CSS | Responsive, utility-first styling |
| Shadcn UI | Accessible and reusable UI components |
| Redux Toolkit | Global state management |
| @dnd-kit | Drag-and-drop interactions for the Kanban board |
| Mock Service Worker (MSW) | Mock API simulation during frontend development |
| Local JSON | Seeded project, task, and user data |
| localStorage | Frontend data persistence during development |
| Figma | UI wireframes and design presentation |
| Napkin AI | Frontend state tree and architecture visualization |
| Git & GitHub | Version control and source code management |
---

# Development Plan

## Sprint 13 – Product Planning
- Finalize the Product Requirements Document (README).
- Design application wireframes in Figma.
- Create the Redux state architecture.
- Plan mock API endpoints.

## Sprint 14 – MVP Development
- Set up the Next.js project.
- Build authentication screens.
- Develop the Project List and Project Dashboard.
- Build the Kanban Board layout.
- Configure Redux Toolkit and mock APIs.

## Sprint 15 – Core Functionality
- Complete task management features.
- Integrate drag-and-drop using @dnd-kit.
- Implement role-based interface behavior.
- Add the activity feed.
- Improve responsive layouts.

## Sprint 16 – Enhancement & Polish
- Improve UI consistency and accessibility.
- Optimize state management and application performance.
- Refine the user experience.
- Explore planned enhancements where time permits.

## Sprint 17 – Finalization
- Test and fix application issues.
- Verify responsiveness across devices.
- Deploy the application.
- Prepare the final project demonstration and documentation.

---

# Future Enhancements

The following features are outside the scope of the initial MVP but can be considered in future iterations of the project.

- Multiple project management
- Calendar view for task deadlines
- File attachments
- GitHub integration
- In-app notifications
- AI-assisted task suggestions

---

# Figma Wireframes

**Figma Link:**
> https://www.figma.com/design/bAfi1nztt95woP3Uqbe8wm/TaskMatrix-UI-UX-Design?node-id=0-1&t=8gd4C8qAS0d4BUH4-1
---

# State Architecture Diagram

### Redux State Tree

<img width="557" height="1080" alt="_- visual selection (2)" src="https://github.com/user-attachments/assets/33f6ad93-a398-4974-b588-f7b9d1d38ed4" />


### Mock API Endpoints

<img width="876" height="864" alt="_- visual selection (1)" src="https://github.com/user-attachments/assets/d049a59a-efa3-4fd7-b9e6-184c770d8267" />


---

# Mock API Endpoints 

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/login | Authenticate user and return role-based access |
| GET | /api/projects | Retrieve available projects |
| GET | /api/projects/:projectId | Retrieve selected project details |
| GET | /api/projects/:projectId/tasks | Retrieve tasks for the selected project |
| POST | /api/tasks | Create a new task |
| PATCH | /api/tasks/:taskId | Update task status, priority, assignee, and due date |
| DELETE | /api/tasks/:taskId | Delete a task |
| GET | /api/users | Retrieve team members |
| GET | /api/activity | Retrieve project activity history |
