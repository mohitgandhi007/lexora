


<div align="center">

# ⚖️ LEXORA

### **Understand More. Search Faster.**

An AI-powered legal document intelligence workspace built to transform dense legal documents into **clear, structured, searchable knowledge.**

<br/>

[![Status](https://img.shields.io/badge/status-in%20development-B65F2A?style=for-the-badge)]()
[![Frontend](https://img.shields.io/badge/frontend-React-11100F?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Backend](https://img.shields.io/badge/backend-Hono-11100F?style=for-the-badge)]()
[![Database](https://img.shields.io/badge/database-Neon%20PostgreSQL-11100F?style=for-the-badge&logo=postgresql&logoColor=white)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-TS-11100F?style=for-the-badge&logo=typescript&logoColor=3178C6)]()

<br/>

> **Legal documents shouldn't be difficult to understand.**
>
> Lexora turns complexity into clarity.

</div>

---

## ◇ What is Lexora?

**Lexora** is an AI-powered legal document intelligence platform designed to help users **read, understand, search, and extract meaningful insights from legal documents.**

Instead of forcing users to manually navigate hundreds of pages of dense legal language, Lexora creates a structured intelligence layer on top of documents.

### From this:

text
Hundreds of pages
Dense legal language
Important clauses buried inside paragraphs
Manual searching
Hours of reading


### To this:

```text
        📄 DOCUMENT
             │
             ▼
        ┌───────────┐
        │ LEXORA AI │
        └─────┬─────┘
              │
     ┌────────┼────────┐
     ▼        ▼        ▼
  Summary   Clauses   Risks
     │        │        │
     └────────┼────────┘
              ▼
     Structured Insights
              │
              ▼
       Clear Understanding
```

---

# ✦ The Vision

Legal information is everywhere.

Understanding it shouldn't require spending hours decoding it.

Lexora aims to create a **personal legal knowledge workspace** where documents become searchable, structured, and easier to understand.

### **Upload. Understand. Search.**

That's the idea.

---

# ✦ Core Features

### 📄 Intelligent Document Workspace

Upload and organize legal documents in one place.

- Document management
- Document metadata
- Document categories
- Searchable workspace
- Recent documents
- Document viewer

---

### 🧠 AI Legal Intelligence

Turn lengthy documents into structured insights.

Lexora is designed to surface:

- Executive summaries
- Key legal points
- Parties involved
- Obligations
- Important clauses
- Risks
- Important dates
- Structured legal insights

---

### 🔎 Global Legal Search

Search across your legal knowledge base instead of opening documents one by one.

```text
"termination clause"
        │
        ▼
   Legal Search
        │
        ▼
Relevant Documents
        │
        ▼
Relevant Sections
        │
        ▼
Exact Context
```

---

### 📑 Document Intelligence Brief

Each document can be transformed into an **Intelligence Brief** containing the information that matters most.

The goal isn't to replace the document.

It's to make the document **understandable.**

---

### 📤 Seamless Upload Workflow

Lexora follows a simple document flow:

```text
UPLOAD
   ↓
PROCESS
   ↓
ANALYZE
   ↓
UNDERSTAND
   ↓
SEARCH
```

---

### 👤 Personal Legal Workspace

A focused workspace for managing documents, summaries, searches, and account settings.

---

# ✦ Product Flow

```mermaid
flowchart LR

A[Upload Document] --> B[Document Processing]
B --> C[AI Analysis]
C --> D[Intelligence Brief]
D --> E[Structured Insights]
E --> F[Global Search]
F --> G[Legal Knowledge Workspace]
```

---

# ✦ Architecture

Lexora follows a clean separation between the client, API, and data layer.

```text
┌─────────────────────────────────────┐
│              LEXORA                 │
│                                     │
│        React + Tailwind             │
│             Frontend                │
└──────────────────┬──────────────────┘
                   │
                   │ REST API
                   ▼
┌─────────────────────────────────────┐
│              HONO                   │
│                                     │
│        API / Middleware Layer       │
└──────────────────┬──────────────────┘
                   │
                   │ Drizzle ORM
                   ▼
┌─────────────────────────────────────┐
│          NEON POSTGRESQL            │
│                                     │
│             Data Layer              │
└─────────────────────────────────────┘
```

### Architecture Principles

- Modular frontend
- API-first backend
- Type-safe data access
- Separated concerns
- Scalable document architecture
- No direct database access from the client

---

# ✦ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend | Hono |
| ORM | Drizzle ORM |
| Database | Neon PostgreSQL |
| API | REST |
| Build Tool | Vite |
| Mobile | React Native + Expo |
| Language | TypeScript |

---

# ✦ Design System

Lexora uses an **Editorial Legal Luxury** visual language.

The interface is intentionally designed to feel closer to a premium legal publication than a conventional SaaS dashboard.

### Color Palette

| Token | Hex |
|---|---|
| Ivory | `#F5F1EA` |
| Paper | `#FAF8F4` |
| Border | `#E3DED6` |
| Ink | `#11100F` |
| Espresso | `#211B17` |
| Brown | `#49382C` |
| Muted | `#756A60` |
| Bronze | `#9A7047` |
| Gold | `#C19A5B` |
| Terracotta | `#B65F2A` |
| Burgundy | `#4A1F1B` |

### Typography

**Display**

- Cormorant Garamond
- Playfair Display
- Libre Baskerville

**Interface**

- Manrope
- Inter
- DM Sans

---

# ✦ Interface

The product is built around a focused legal workspace rather than a conventional dashboard.

### Core Screens

```text
/
├── Dashboard
├── Documents
│   └── Document Viewer
├── Upload
├── AI Summary
├── Search
├── Settings
└── Authentication
    ├── Login
    ├── Register
    └── Forgot Password
```

---

# ✦ Mobile

Lexora also includes a dedicated mobile experience built with:

**React Native + Expo + TypeScript**

The mobile application is designed specifically for smaller screens rather than simply shrinking the desktop interface.

### Mobile Navigation

```text
┌────────┬───────────┬────────┬─────────┐
│  Home  │ Documents │ Search │ Profile │
└────────┴───────────┴────────┴─────────┘
```

Native interactions include:

- Document picker
- Safe-area handling
- Keyboard-aware layouts
- Native navigation
- Document sharing
- Mobile-optimized document viewing

---

# ✦ Project Structure

```text
lexora/
│
├── web/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   │
│   └── ...
│
├── mobile/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── ...
│   └── ...
│
└── README.md
```

---

# ✦ Getting Started

## Prerequisites

Make sure you have installed:

- Node.js 20+
- npm
- Git
- Expo CLI for mobile development

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/lexora.git

cd lexora
```

---

## 2. Install Dependencies

### Web

```bash
cd web
npm install
```

### Backend

```bash
cd backend
npm install
```

### Mobile

```bash
cd mobile
npm install
```

---

## 3. Environment Variables

Create the required `.env` files.

### Backend

```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_jwt_secret
```

### Frontend

```env
VITE_API_BASE_URL=your_api_url
```

### Mobile

```env
EXPO_PUBLIC_API_BASE_URL=your_api_url
```

> Never commit secrets or production credentials to Git.

---

# ✦ Running Locally

### Frontend

```bash
npm run dev
```

### Backend

```bash
npm run dev
```

### Mobile

```bash
npx expo start
```

Then run the application using:

```text
iOS Simulator
Android Emulator
Expo Go
```

---

# ✦ API Layer

The frontend communicates with the backend through dedicated service modules.

```text
services/
│
├── authApi.ts
├── documentsApi.ts
├── summariesApi.ts
└── searchApi.ts
```

This keeps UI components independent from backend implementation details.

---

# ✦ Development Philosophy

Lexora is built around a few simple principles.

### 01 — Clarity over complexity

Legal software doesn't need to feel complicated.

### 02 — Information over decoration

Every visual element should help users understand or navigate information.

### 03 — Structure matters

Unstructured legal text becomes more useful when transformed into meaningful information.

### 04 — AI should assist understanding

Lexora is designed to help users interpret and navigate documents, not blindly replace professional legal judgment.

### 05 — Premium doesn't mean excessive

The interface uses typography, spacing, hierarchy, and restrained color rather than endless cards, gradients, and animations.

---

# ✦ Roadmap

- [x] Editorial legal design system
- [x] Dashboard
- [x] Documents workspace
- [x] Document viewer
- [x] Upload interface
- [x] AI summary interface
- [x] Global legal search interface
- [x] Settings
- [x] Authentication UI
- [ ] React production architecture
- [ ] Hono API integration
- [ ] PostgreSQL persistence
- [ ] Authentication
- [ ] Document processing pipeline
- [ ] AI document analysis
- [ ] Semantic search
- [ ] Mobile application
- [ ] Production deployment

---

# ✦ Security & Privacy

Legal documents can contain highly sensitive information.

Lexora is designed with separation between:

```text
Client
  ↓
API
  ↓
Authentication
  ↓
Database
```

Production deployments should additionally implement:

- Secure authentication
- Authorization
- Input validation
- Rate limiting
- Secure file handling
- Environment secret management
- Database access controls
- Audit logging
- Encrypted transport

---

# ✦ Disclaimer

**Lexora is an information and document-intelligence tool.**

AI-generated summaries and insights may contain errors or omissions and should not be treated as legal advice.

Always verify important information against the original document and consult a qualified legal professional where appropriate.

---

# ✦ Contributing

Contributions, ideas, and improvements are welcome.

```bash
git checkout -b feature/your-feature
```

Make your changes, test them, and open a pull request.

Before submitting a PR:

- Keep components modular
- Follow the existing design system
- Avoid unnecessary dependencies
- Keep secrets out of commits
- Test affected functionality
- Keep UX consistent across web and mobile

---

# ✦ Team

Built with caffeine, questionable sleep schedules, and an unreasonable amount of attention to typography.

<div align="center">

### **LEXORA**

**Understand More. Search Faster.**

<br/>

⚖️ · 📄 · 🧠 · 🔎

<br/>

*Legal intelligence, without the legal clutter.*

</div>
```
