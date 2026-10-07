# FarmLink

FarmLink is a district-first agri marketplace built to connect farmers, customers, shops, and traders in one ecosystem.

## Goals
- Help farmers sell directly to buyers without heavy middlemen
- Enable customers to buy fresh produce easily
- Support local shops and bulk traders with wholesale ordering
- Start from one district and scale to city, state, and country level

## Tech stack
- Mobile app: React Native + Expo
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL + Prisma (planned)
- Payments: Razorpay (planned)
- Deployment: Vercel / Railway / Render

## Current repo status
This repository currently includes:
- mobile app starter
- backend starter API
- project structure for a scalable agriculture marketplace

## Project structure
```bash
farm-link/
├── apps/
│   └── mobile/
├── services/
│   └── api/
├── README.md
├── package.json
├── .gitignore
└── docs/
```

## Quick start

### 1) Install dependencies
```bash
npm install
```

### 2) Start backend
```bash
npm run dev:api
```

### 3) Start mobile app
```bash
npm run dev:mobile
```

## Backend API endpoints
- GET /api/health
- GET /api/products

## Notes
This is the initial MVP scaffolding for the app, and it is designed to grow into a full district-to-national agri marketplace.
