# Quickstart Guide: 3D Todo Frontend

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Create a `.env.local` file in the frontend directory with the following variables:
```env
NEXT_PUBLIC_API_URL=<your-api-base-url>
BETTER_AUTH_SECRET=<your-auth-secret>
NEXTAUTH_URL=<your-application-url>
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open your browser to [http://localhost:3000](http://localhost:3000) to view the application.

## Key Features

- **Authentication**: Secure login/signup with Better Auth
- **3D Task Cards**: Interactive 3D representations of tasks using React Three Fiber
- **Animations**: Smooth transitions and interactions powered by Framer Motion
- **Dark/Light Mode**: Theme switching with persistent user preferences
- **Responsive Design**: Works across desktop, tablet, and mobile devices

## Folder Structure
```
frontend/
├── app/
│   ├── layout.tsx                  # 3D background + theme + Toaster
│   ├── login/page.tsx              # 3D auth page
│   ├── signup/page.tsx             # 3D auth page
│   ├── dashboard/
│   │   ├── layout.tsx              # Protected layout + nav
│   │   └── tasks/
│   │       └── page.tsx            # Main 3D task grid
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx               # Reusable R3F Canvas wrapper
│   │   ├── ParticlesBackground.tsx # Subtle 3D particles
│   │   ├── TaskCard3D.tsx          # Floating interactive task card
│   │   └── Spinner3D.tsx           # Loading animation
│   ├── ui/
│   │   ├── TaskCard.tsx            # 2D fallback or wrapper
│   │   ├── TaskFormModal.tsx
│   │   └── GlassCard.tsx           # Glassmorphism component
├── lib/
│   ├── api.ts                      # JWT fetch wrapper
│   └── auth.ts                     # Better Auth helpers
├── hooks/
│   └── useTheme.ts                 # Dark/light toggle
└── types/
    └── task.ts
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase