---
name: "fullstack-todo-phase2-builder"
description: "Builds a complete multi-user Todo web application using Next.js 16+, FastAPI, Neon DB, and Better Auth in a spec-driven monorepo"
version: "1.0.0"
---

# Full-Stack Todo App Builder (Phase II)

## When to Use This Skill

Use this skill when implementing Phase II of the "Evolution of Todo" hackathon project to build a complete multi-user Todo web application with authentication, authorization, and persistent storage. This skill is specifically designed for spec-driven development using the Spec-Kit Plus framework in a monorepo structure.

## Process Steps

1. **Initialize Monorepo Structure**
   - Create the root project directory with `.spec-kit/config.yaml`
   - Set up `specs/`, `frontend/`, and `backend/` directories
   - Initialize spec-driven development workflow

2. **Define Specifications**
   - Create feature specs in `specs/features/` for: Add, List/View, Update, Delete, Mark Complete
   - Define API specs in `specs/api/` for secured REST endpoints
   - Create database specs in `specs/database/` for user and task models
   - Design UI specs in `specs/ui/` for the frontend components

3. **Set Up Backend Infrastructure**
   - Initialize FastAPI project with SQLModel
   - Configure Neon Serverless PostgreSQL connection
   - Implement Better Auth with JWT authentication
   - Create user isolation mechanisms

4. **Implement Secure API Endpoints**
   - Build REST API endpoints: GET/POST/PUT/DELETE/PATCH for `/api/tasks`
   - Implement JWT verification middleware
   - Enforce user ownership validation (401/403 responses)
   - Apply user_id filtering for data isolation

5. **Develop Frontend Components**
   - Set up Next.js 16+ with App Router and TypeScript
   - Integrate Tailwind CSS for styling
   - Implement authentication flows with Better Auth
   - Create task management UI components

6. **Integrate Frontend and Backend**
   - Connect frontend to secured API endpoints
   - Handle JWT tokens in Authorization headers
   - Implement error handling and user feedback
   - Test cross-component functionality

7. **Configure Shared Environment**
   - Set up shared BETTER_AUTH_SECRET environment variable
   - Configure deployment settings for both frontend and backend
   - Validate security measures

## Output Format

The skill should produce:

- A complete monorepo structure with properly configured frontend and backend
- Working authentication system with user signup/signin
- Fully functional task management system with all 5 core features
- Properly secured API endpoints with JWT validation
- User isolation ensuring data privacy
- Ready-to-deploy application following security best practices

## Quality Criteria

- [ ] All 5 core features implemented: Add, List/View, Update, Delete, Mark Complete
- [ ] Persistent storage in Neon DB with proper schema
- [ ] User authentication with Better Auth working correctly
- [ ] JWT tokens properly handled in Authorization headers
- [ ] Backend verifies JWT and enforces user ownership (401/403 responses)
- [ ] Data isolation between users enforced at database level
- [ ] Spec-driven development followed throughout the project
- [ ] No manual coding bypassing the specification workflow
- [ ] Clean, maintainable code following TypeScript and Python best practices
- [ ] Proper error handling and user feedback mechanisms

## Example Input/Output

### Input
User request: "Create a multi-user todo application with authentication and task management features."

### Output
Complete implementation including:
- Monorepo structure with spec-driven development setup
- Authentication system with signup/signin flows
- Task management with add, list, update, delete, and mark complete functionality
- Secure API endpoints with JWT authentication
- User data isolation ensuring privacy
- Deployment-ready frontend and backend applications