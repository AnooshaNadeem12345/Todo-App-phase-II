# 3D Todo Frontend

A professional 3D Todo application with immersive interface built using Next.js, React Three Fiber, and Framer Motion.

## Features

- **3D Task Visualization**: Interactive 3D cards for tasks with hover effects and animations
- **Authentication**: Secure login/signup with Better Auth
- **Dark/Light Mode**: Theme switching with persistent user preferences
- **Responsive Design**: Works across desktop, tablet, and mobile devices
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Glassmorphism UI**: Modern UI elements with frosted glass effects

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Rendering**: React Three Fiber (@react-three/fiber), @react-three/drei
- **Animations**: Framer Motion, @react-spring/three
- **Authentication**: Better Auth
- **Notifications**: Sonner
- **Theming**: next-themes

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3d-todo-frontend
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Create a `.env.local` file in the frontend directory with the following variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
BETTER_AUTH_SECRET=your-better-auth-secret-here
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser to [http://localhost:3000](http://localhost:3000) to view the application.

## Screenshots

![3D Todo Dashboard](screenshots/dashboard.png)
*A preview of the 3D task grid interface*

![Task Creation Modal](screenshots/task-modal.png)
*Floating modal with 3D task preview*

## Architecture

The application follows a component-based architecture with:

- **3D Components**: Located in `components/3d/` for all 3D rendering logic
- **UI Components**: Located in `components/ui/` for standard UI elements
- **Services**: Located in `lib/` for API and authentication logic
- **Hooks**: Located in `hooks/` for custom React hooks
- **Types**: Located in `types/` for TypeScript type definitions

## Key Files

- `app/layout.tsx`: Root layout with 3D background and theme provider
- `app/login/page.tsx`: Authentication page with 3D background
- `app/dashboard/tasks/page.tsx`: Main task management interface
- `components/3d/TaskCard3D.tsx`: Interactive 3D task representation
- `components/ui/TaskFormModal.tsx`: Task creation/editing modal with 3D preview
- `lib/api.ts`: API client with JWT token handling
- `lib/auth.ts`: Authentication helpers

## Development

This project uses the Spec-Kit Plus methodology for development. All features are planned and tracked in the `specs/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.