# Joyjatra Travel 🌍

Joyjatra Travel is a high-performance travel management platform built with **Next.js**. It features a robust Role-Based Access Control (RBAC) system, real-time support messaging, and advanced data management tools.

---

## ✨ Features

### 🛡️ Role-Based Access Control (RBAC)
- **Admin**: Full system access, including user management and platform configuration.
- **Moderator**: Create and manage travel events, write blogs, and handle support messages.
- **User**: Browse events, read blogs, and book travel experiences.

### ⚡ Technical Highlights
- **Real-time Interaction**: Instant support messaging powered by **Socket.io**.
- **Dynamic Data Management**: Advanced filtering and sorting using **TanStack Table**.
- **Optimized Data Fetching**: Robust server-state management with **TanStack Query**.
- **Type-Safe Forms**: Complex form validation via **TanStack Form** and TypeScript.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Package Manager**: pnpm
- **UI/UX**: Shadcn UI, Tailwind CSS
- **State & Networking**: TanStack Query, Axios, Socket.io
- **Forms & Tables**: TanStack Form, TanStack Table

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17 or later
- **pnpm**: `npm install -g pnpm.`

### 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [[https://github.com/your-username/joyjatra-travel.git](https://github.com/abdulbariks/JoyjatraTravel-Client)](https://github.com/your-username/joyjatra-travel.git)
   cd JoyjatraTravel-Client
   Configure Environment Variables:
   (NEXT_PUBLIC_API_URL=your_backend_api_url)
   (NEXT_PUBLIC_SOCKET_URL=your_socket_server_url)
   pnpm install
   pnpm dev
   ```
