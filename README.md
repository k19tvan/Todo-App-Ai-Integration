# To-Do App with AI-Powered Scheduling

## 🚀 Project Setup & Usage
How to install and run the project:
```cmd
npm install
npm run dev
```

## 🔗 Deployed Web URL or APK file
✍️ [Todo List Website](https://navertodolist.vercel.app/)

## 🎥 Demo Video
✍️ [Video Demo](./TodoList.mp4)

## 💻 Project Introduction

### a. Overview
A to‑do list app that helps manage time more conveniently and effectively, with AI-assisted planning.

### b. Key Features & Function Manual
- 🔐 User authentication: Sign up / Log in to secure and sync personal data.  
- 📅 Date-based task management: Easily view, sort and plan tasks for different days.  
- ⏰ Smart sorting: Tasks are automatically ordered by time (start/end time) for a clear overview.  
- ➕✏️ Full CRUD: Add, Edit, Delete tasks with a user-friendly interface.  
- 🎨 Modern UI: Green Tech theme, optimized for desktop.
- 📊 Daily statistics: Track Pending, Completed, Overdue counts and Completion rate.  
- 🤖 AI schedule generation: Convert natural-language descriptions into structured schedules (text, start_time, end_time).

### c. Unique Features (What’s special about this app?)
- 🤖 AI‑First scheduling: Convert natural-language descriptions into daily plans with preview, edit and apply options.  
- ⚡ Smart replace: Replace an entire day’s schedule with AI suggestions.
- ⏱️ Time conflict detection: Auto-sort and flag overlapping items for easy adjustment.  
- 🔒 Solid architecture: Per-user data separation (Supabase), responsive UI and scalable design.

### d. Technology Stack and Implementation Methods
- Frontend:
  - React (functional components + hooks: useEffect/useMemo/useCallback)  
  - JSX + plain CSS
- Backend & Persistence:
  - Supabase (Postgres): Auth + todos storage  
  - Optimization: Use bulk delete + bulk insert when applying AI schedules
- AI:
  - Google GenAI (Gemini): Returns structured JSON; frontend parses, validates HH:MM and normalizes dates
- Core logic:
  - Normalize dates (YYYY‑MM‑DD) and times (HH:MM)  
  - Optimistic UI for a fast user experience

### e. Service Architecture & Database structure (when used)
- Architecture: Frontend (React) ↔ Supabase (Auth, Postgres) ↔ Google GenAI  
- AI flow:
  1. User submits a description.  
  2. Frontend calls GenAI → receives schedule JSON.  
  3. Frontend validates, bulk deletes old tasks for the day, bulk inserts new tasks.  
- Schema (todos):
  - id: uuid (PK)  
  - user_id: uuid (FK)  
  - text: text  
  - date: date (YYYY-MM-DD)  
  - start_time: varchar(5) (HH:MM)  
  - end_time: varchar(5) (HH:MM)  
  - is_completed: boolean  
  - created_at / updated_at: timestamptz
- Security & optimization:
  - Enable RLS

## 🧠 Reflection

### a. If you had more time, what would you expand?
- 🔁 Session persistence: Keep users logged in across page refreshes by managing Supabase sessions.  
- ⌚ Inline time editing: Allow editing start_time / end_time with validation and conflict warnings.  
- 🤖 Long-term AI planning: Support multi-day plans (e.g., a 1–2 month study plan), chunking, prioritization and preview before applying.

### b. If you integrate AI APIs more for your app, what would you do?
Turn it into an AI agent that can modify and edit tasks directly through natural language on the web.

## ✅ Checklist
- [ ✅] Code runs without errors  
- [ ✅] All required features implemented (add/edit/delete/complete tasks)  
- [ ✅] All ✍️ sections are filled
