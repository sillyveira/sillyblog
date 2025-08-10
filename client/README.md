# 🎭 SillyBlog Client

> **A silly ideas board** - Modern frontend built with Next.js, Ant Design and Tailwind CSS

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.26.7-1890ff?logo=antdesign)](https://ant.design/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://typescriptlang.org/)

## 📋 About the Project

The **SillyBlog Client** is the frontend of a modern blog application built with microservices architecture. This interface allows users to navigate, create and manage posts in an intuitive and responsive way.

## 🚀 Technologies

- **[Next.js 15.4.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - Library for building user interfaces
- **[Ant Design 5.26.7](https://ant.design/)** - UI component system
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://typescriptlang.org/)** - Static typing for JavaScript

## 🏗️ Architecture

This client is part of a microservices system that includes:

- **Frontend (this project)** - User interface
- **API Gateway** - Request routing and proxying
- **Auth Service** - Authentication service
- **Post Service** - Post management service

## 📦 Prerequisites

- **Node.js** >= 18.0.0
- **npm**

## 📁 Project Structure

```
client/
├── src/
│   ├── app/                    # Pages and layouts (App Router)
│   │   ├── components/         # Reusable components
│   │   │   ├── Header/         # Application header
│   │   │   ├── PostCard/       # Post display card
│   │   │   ├── PostForm/       # Creation/editing form
│   │   │   ├── PostSkeleton/   # Loading skeleton
│   │   │   └── MarkdownPreview/ # Markdown viewer
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── posts/              # Post-related pages
│   │   │   ├── create/         # Create new post
│   │   │   └── [id]/           # Individual post and editing
│   │   ├── profile/            # Profile pages
│   │   │   └── [id]/           # User profile
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── contexts/               # React contexts
│   │   └── authContext.tsx     # Authentication context
│   └── utils/                  # Utilities
│       └── api.ts              # Custom HTTP client
├── public/                     # Static files
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Features

- ✅ **Complete Authentication** - Login, registration and logout with JWT
- ✅ **Post Management** - Creation, editing, viewing and deletion of posts
- ✅ **Markdown Editor** - Editor with real-time preview and syntax highlighting
- ✅ **User Profile** - User profile viewing and editing
- ✅ **Pagination System** - Optimized navigation between posts
- ✅ **Real-time Updates** - Automatic user data synchronization
- ✅ **Form Validation** - Robust validation on all fields
- ✅ **User Feedback** - Clear notifications for user actions

## ✨ Key Features

### 🔐 Authentication System
- New user registration with validation
- Secure login with HTTP-only cookies
- Protected route authentication
- Automatic user context updates

### 📝 Post Editor
- Markdown editor with tabs (Editor/Preview)
- Real-time preview with custom components
- Integrated Markdown syntax hints
- Content and title validation

### 👤 Profile Management
- Public profile viewing
- Profile edit
- JWT token synchronization

### 🎨 User Interface
- Modern design with Ant Design + Tailwind CSS
- Fixed header with intuitive navigation
- Consistent theme throughout application
