 TaskMatrix - AI Prompts



1.



I'm building a frontend-track capstone application based on an Agile project management tool. The required modules are Kanban boards, task assignment, deadlines, priority tags, role management, and activity feed. Since this is a frontend-only build, what tech stack and MVP scope would realistically fit a 5-week development timeline?







2.



The assignment does not explicitly mention project CRUD. I assumed it because Jira/Asana usually have multiple projects. Can a Jira-inspired application still feel complete with one seeded workspace? What are the advantages and disadvantages of keeping or removing full project management?







3.



Should my application use roles like Admin, Project Manager, and Member, or should I create separate roles like Developer, QA, Viewer, etc.? If job titles do not affect permissions, should they be separate metadata instead of access-control roles?







4.



For an Agile project management application, which user flow makes more sense: Login → Dashboard → Project List → Board or Login → Project List → Dashboard → Board? The dashboard contains project-specific statistics, deadlines, and activity, so how should navigation be structured?







5.



My application has shared data across multiple screens: authentication, projects, tasks, users, activity feed, and UI state. Tasks are used by Dashboard, Kanban Board, and Task Drawer. Should I use Redux Toolkit or Zustand for this complexity? Explain the trade-offs.







6.



Design a frontend state structure and mock API endpoint list for an Agile project management application. The application needs tasks, projects, users, and activity tracking. The activity feed should be reusable and filterable by project, task, and user without creating separate implementations.






7.



Review the screen structure of a modern SaaS-style Agile project management tool. The planned screens are Login, Project List, Dashboard, Kanban Board, Task Drawer, and Profile. Identify any missing flows, unnecessary screens, or UX problems before implementation.
