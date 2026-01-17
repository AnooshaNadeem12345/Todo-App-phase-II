---
name: "fullstack-todo-phase2-builder"
description: "Builds a complete multi-user Todo web application with Next.js, FastAPI, Neon DB, and Better Auth following Spec-Kit Plus methodology"
version: "1.0.0"
---

# Full-Stack Todo Application Builder (Phase II)

## When to Use This Skill

Use this skill when you need to implement a complete multi-user Todo web application as part of "The Evolution of Todo" hackathon project. This skill is appropriate when you want to:

- Generate a full-stack application with Next.js frontend and FastAPI backend
- Implement user authentication and authorization with Better Auth and JWT
- Set up persistent storage with Neon Serverless PostgreSQL
- Follow Spec-Kit Plus methodology with spec-driven development
- Create a monorepo structure with proper separation of concerns
- Ensure user isolation and ownership enforcement for tasks

## Process Steps

1. **Initialize Monorepo Structure**
   - Create the root directory with proper folder structure (frontend/, backend/, specs/, .specify/)
   - Initialize .specify/config.yaml for Spec-Kit Plus
   - Set up shared configuration files

2. **Create Specifications**
   - Define feature specs in specs/features/ for API, database, UI
   - Document authentication requirements
   - Specify user isolation and ownership rules
   - Detail the 5 core features: Add, List/View, Update, Delete, Mark Complete

3. **Set Up Backend Infrastructure**
   - Initialize FastAPI project with SQLModel
   - Configure Neon Serverless PostgreSQL connection
   - Implement Better Auth with JWT authentication
   - Create Task model with user_id foreign key for ownership

4. **Implement Backend API**
   - Create secured REST endpoints: GET/POST/PUT/DELETE/PATCH /api/tasks
   - Implement JWT verification middleware
   - Enforce user ownership checks (return 401/403 for unauthorized access)
   - Implement proper error handling and validation

5. **Set Up Frontend Infrastructure**
   - Initialize Next.js 16+ project with TypeScript and Tailwind CSS
   - Configure Better Auth client-side integration
   - Set up API communication layer with JWT token handling

6. **Develop Frontend Components**
   - Create authentication pages (signup/signin)
   - Build task management UI (list, form, controls)
   - Implement protected routes
   - Add loading and error states

7. **Integrate Frontend with Backend**
   - Connect frontend to backend API endpoints
   - Implement JWT token passing in Authorization header
   - Handle authentication state and redirects

8. **Testing and Validation**
   - Verify user isolation works correctly
   - Test all 5 core features
   - Validate JWT authentication flow
   - Ensure proper error handling

## Output Format

The skill produces a structured response containing:

```
{
  "status": "success|error",
  "monorepo_structure": {
    "frontend": {
      "framework": "Next.js 16+",
      "language": "TypeScript",
      "styling": "Tailwind CSS",
      "auth_integration": "Better Auth client"
    },
    "backend": {
      "framework": "FastAPI",
      "database": "SQLModel with Neon Serverless PostgreSQL",
      "auth": "Better Auth with JWT",
      "api_endpoints": [
        "GET /api/tasks",
        "POST /api/tasks",
        "GET /api/tasks/{id}",
        "PUT /api/tasks/{id}",
        "DELETE /api/tasks/{id}"
      ]
    },
    "security": {
      "jwt_verification": true,
      "user_isolation": true,
      "ownership_enforcement": true,
      "error_codes": [401, 403]
    },
    "specification_compliance": {
      "features_implemented": ["Add", "List/View", "Update", "Delete", "Mark Complete"],
      "persistent_storage": true,
      "authentication": true,
      "authorization_header": true
    }
  },
  "files_created": [
    // List of created files and directories
  ],
  "configuration_details": {
    "environment_variables": ["BETTER_AUTH_SECRET", "DATABASE_URL", "NEXTAUTH_URL"],
    "dependencies_installed": {
      "frontend": ["next", "@types/react", "better-auth", ...],
      "backend": ["fastapi", "sqlmodel", "better-auth", ...]
    }
  },
  "validation_results": {
    "auth_flow_working": boolean,
    "user_isolation_tested": boolean,
    "api_endpoints_accessible": boolean,
    "error_handling_validated": boolean
  }
}
```

## Quality Criteria

- ✅ **Spec-Driven Development**: All code follows specifications defined in specs/ directory
- ✅ **Monorepo Structure**: Proper separation of frontend, backend, and specs
- ✅ **Authentication**: Better Auth with JWT properly implemented on both frontend and backend
- ✅ **User Isolation**: Tasks are properly isolated by user_id with ownership enforcement
- ✅ **API Security**: All endpoints verify JWT and enforce authorization
- ✅ **Error Handling**: Proper HTTP status codes (401/403) for unauthorized access
- ✅ **Complete Features**: All 5 core features (Add, List/View, Update, Delete, Mark Complete) implemented
- ✅ **Persistent Storage**: Neon Serverless PostgreSQL correctly configured and used
- ✅ **Authorization Header**: JWT tokens passed correctly in Authorization header
- ✅ **Shared Configuration**: BETTER_AUTH_SECRET properly shared between frontend and backend
- ✅ **No Manual Coding**: Implementation follows spec-driven approach without ad-hoc coding

## Example Input/Output

**Input:**
```
Build a full-stack Todo application with Next.js, FastAPI, Neon DB, and Better Auth following Spec-Kit Plus methodology
```

**Output:**
```
{
  "status": "success",
  "monorepo_structure": {
    "frontend": {
      "framework": "Next.js 16+",
      "language": "TypeScript",
      "styling": "Tailwind CSS",
      "auth_integration": "Better Auth client"
    },
    "backend": {
      "framework": "FastAPI",
      "database": "SQLModel with Neon Serverless PostgreSQL",
      "auth": "Better Auth with JWT",
      "api_endpoints": [
        "GET /api/tasks",
        "POST /api/tasks",
        "GET /api/tasks/{id}",
        "PUT /api/tasks/{id}",
        "DELETE /api/tasks/{id}"
      ]
    },
    "security": {
      "jwt_verification": true,
      "user_isolation": true,
      "ownership_enforcement": true,
      "error_codes": [401, 403]
    },
    "specification_compliance": {
      "features_implemented": ["Add", "List/View", "Update", "Delete", "Mark Complete"],
      "persistent_storage": true,
      "authentication": true,
      "authorization_header": true
    }
  },
  "files_created": [
    "frontend/package.json",
    "backend/main.py",
    "backend/models/task.py",
    "backend/api/tasks.py",
    "specs/features/tasks/spec.md",
    "specs/features/auth/spec.md",
    ".env.example",
    "README.md"
  ],
  "configuration_details": {
    "environment_variables": ["BETTER_AUTH_SECRET", "DATABASE_URL", "NEXTAUTH_URL"],
    "dependencies_installed": {
      "frontend": ["next", "@types/react", "better-auth", "tailwindcss"],
      "backend": ["fastapi", "sqlmodel", "uvicorn", "better-auth"]
    }
  },
  "validation_results": {
    "auth_flow_working": true,
    "user_isolation_tested": true,
    "api_endpoints_accessible": true,
    "error_handling_validated": true
  }
}
```