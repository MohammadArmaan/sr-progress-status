# 📊 Progress Status Tracker

A simple React-based progress tracker application built for **SR Portraits and Events**.  
The application allows tracking the development lifecycle through milestones and provides an **admin panel** to update the progress in real time.

---

## 🚀 Features

- **Progress Tracker (Home Page `/`)**
  - Displays current project status through milestones.
  - Visual progress shown using percentage completion.
  - Automatically reflects updates from the admin panel.

- **Admin Panel (`/admin`)**
  - Secure route (dummy authentication) for administrators.
  - Update progress milestones (percentage or status).
  - Changes sync instantly with the home page.

- **Universal State**
  - Uses a global state (via React Context / Zustand / Redux).
  - Ensures updates in one route are reflected everywhere.

