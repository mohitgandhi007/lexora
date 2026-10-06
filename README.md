


<div align="center">

# âš–ï¸ LEXORA

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

## â—‡ What is Lexora?

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
        ðŸ“„ DOCUMENT
             â”‚
             â–¼
        â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
        â”‚ LEXORA AI â”‚
        â””â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”˜
              â”‚
     â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”
     â–¼        â–¼        â–¼
  Summary   Clauses   Risks
     â”‚        â”‚        â”‚
     â””â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”˜
              â–¼
     Structured Insights
              â”‚
              â–¼
       Clear Understanding
```

---

# âœ¦ The Vision

Legal information is everywhere.

Understanding it shouldn't require spending hours decoding it.

Lexora aims to create a **personal legal knowledge workspace** where documents become searchable, structured, and easier to understand.

### **Upload. Understand. Search.**

That's the idea.

---

# âœ¦ Core Features

### ðŸ“„ Intelligent Document Workspace

Upload and organize legal documents in one place.

- Document management
- Document metadata
- Document categories
- Searchable workspace
- Recent documents
- Document viewer

---

### ðŸ§  AI Legal Intelligence

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

### ðŸ”Ž Global Legal Search

Search across your legal knowledge base instead of opening documents one by one.

```text
"termination clause"
        â”‚
        â–¼
   Legal Search
        â”‚
        â–¼
Relevant Documents
        â”‚
        â–¼
Relevant Sections
        â”‚
        â–¼
Exact Context
```

---

### ðŸ“‘ Document Intelligence Brief

Each document can be transformed into an **Intelligence Brief** containing the information that matters most.

The goal isn't to replace the document.

It's to make the document **understandable.**

---

### ðŸ“¤ Seamless Upload Workflow

Lexora follows a simple document flow:

```text
UPLOAD
   â†“
PROCESS
   â†“
ANALYZE
   â†“
UNDERSTAND
   â†“
SEARCH
```

---

### ðŸ‘¤ Personal Legal Workspace

A focused workspace for managing documents, summaries, searches, and account settings.

---

# âœ¦ Product Flow

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

# âœ¦ Architecture

Lexora follows a clean separation between the client, API, and data layer.

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              LEXORA                 â”‚
â”‚                                     â”‚
â”‚        React + Tailwind             â”‚
â”‚             Frontend                â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                   â”‚
                   â”‚ REST API
                   â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚              HONO                   â”‚
â”‚                                     â”‚
â”‚        API / Middleware Layer       â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                   â”‚
                   â”‚ Drizzle ORM
                   â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚          NEON POSTGRESQL            â”‚
â”‚                                     â”‚
â”‚             Data Layer              â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### Architecture Principles

- Modular frontend
- API-first backend
- Type-safe data access
- Separated concerns
- Scalable document architecture
- No direct database access from the client

---

# âœ¦ Tech Stack

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

# âœ¦ Design System

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

# âœ¦ Interface

The product is built around a focused legal workspace rather than a conventional dashboard.

### Core Screens

```text
/
â”œâ”€â”€ Dashboard
â”œâ”€â”€ Documents
â”‚   â””â”€â”€ Document Viewer
â”œâ”€â”€ Upload
â”œâ”€â”€ AI Summary
â”œâ”€â”€ Search
â”œâ”€â”€ Settings
â””â”€â”€ Authentication
    â”œâ”€â”€ Login
    â”œâ”€â”€ Register
    â””â”€â”€ Forgot Password
```

---

# âœ¦ Mobile

Lexora also includes a dedicated mobile experience built with:

**React Native + Expo + TypeScript**

The mobile application is designed specifically for smaller screens rather than simply shrinking the desktop interface.

### Mobile Navigation

```text
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚  Home  â”‚ Documents â”‚ Search â”‚ Profile â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

Native interactions include:

- Document picker
- Safe-area handling
- Keyboard-aware layouts
- Native navigation
- Document sharing
- Mobile-optimized document viewing

---

# âœ¦ Project Structure

```text
lexora/
â”‚
â”œâ”€â”€ web/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ pages/
â”‚   â”‚   â”œâ”€â”€ layouts/
â”‚   â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â””â”€â”€ types/
â”‚   â”‚
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ mobile/
â”‚   â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ services/
â”‚   â”œâ”€â”€ hooks/
â”‚   â””â”€â”€ ...
â”‚
â”œâ”€â”€ backend/
â”‚   â”œâ”€â”€ src/
â”‚   â”‚   â”œâ”€â”€ routes/
â”‚   â”‚   â”œâ”€â”€ middleware/
â”‚   â”‚   â””â”€â”€ ...
â”‚   â””â”€â”€ ...
â”‚
â””â”€â”€ README.md
```

---

# âœ¦ Getting Started

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

# âœ¦ Running Locally

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

# âœ¦ API Layer

The frontend communicates with the backend through dedicated service modules.

```text
services/
â”‚
â”œâ”€â”€ authApi.ts
â”œâ”€â”€ documentsApi.ts
â”œâ”€â”€ summariesApi.ts
â””â”€â”€ searchApi.ts
```

This keeps UI components independent from backend implementation details.

---

# âœ¦ Development Philosophy

Lexora is built around a few simple principles.

### 01 â€” Clarity over complexity

Legal software doesn't need to feel complicated.

### 02 â€” Information over decoration

Every visual element should help users understand or navigate information.

### 03 â€” Structure matters

Unstructured legal text becomes more useful when transformed into meaningful information.

### 04 â€” AI should assist understanding

Lexora is designed to help users interpret and navigate documents, not blindly replace professional legal judgment.

### 05 â€” Premium doesn't mean excessive

The interface uses typography, spacing, hierarchy, and restrained color rather than endless cards, gradients, and animations.

---

# âœ¦ Roadmap

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

# âœ¦ Security & Privacy

Legal documents can contain highly sensitive information.

Lexora is designed with separation between:

```text
Client
  â†“
API
  â†“
Authentication
  â†“
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

# âœ¦ Disclaimer

**Lexora is an information and document-intelligence tool.**

AI-generated summaries and insights may contain errors or omissions and should not be treated as legal advice.

Always verify important information against the original document and consult a qualified legal professional where appropriate.

---

# âœ¦ Contributing

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

# âœ¦ Team

Built with caffeine, questionable sleep schedules, and an unreasonable amount of attention to typography.

<div align="center">

### **LEXORA**

**Understand More. Search Faster.**

<br/>

âš–ï¸ Â· ðŸ“„ Â· ðŸ§  Â· ðŸ”Ž

<br/>

*Legal intelligence, without the legal clutter.*

</div>
```

