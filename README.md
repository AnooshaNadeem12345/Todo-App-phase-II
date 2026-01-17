# Phase-II

Welcome to the Phase-II project! This repository contains a full-stack application built with modern technologies including Next.js for the frontend and FastAPI for the backend.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Overview
Phase-II is a comprehensive full-stack application that leverages the power of Next.js for the frontend and FastAPI for the backend. The project follows modern development practices and includes authentication, database integration, and a well-structured architecture.

## Features
- Full-stack application with Next.js frontend and FastAPI backend
- Authentication system using Better Auth
- Database integration with SQLModel
- RESTful API endpoints
- Modern UI with Tailwind CSS
- Environment configuration management
- Structured project organization with specifications

## Technology Stack
- **Frontend**: Next.js, React, TypeScript
- **Backend**: FastAPI, Python
- **Database**: SQLModel (SQLAlchemy + Pydantic)
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
- **Package Management**: npm (frontend), pip (backend)
- **Specifications**: Markdown-based specs following Spec-Kit Plus methodology

## Project Structure
```
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Application pages and routing
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utility functions and constants
│   ├── hooks/                # Custom React hooks
│   ├── providers/            # Context providers
│   ├── types/                # TypeScript type definitions
│   ├── public/               # Static assets
│   ├── .env                  # Environment variables
│   ├── .env.local            # Local environment variables
│   ├── next.config.mjs       # Next.js configuration
│   ├── package.json          # Frontend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── phase/                    # Backend FastAPI application
│   ├── main.py               # Main FastAPI application entry point
│   ├── auth/                 # Authentication module
│   ├── api/                  # API routes
│   ├── models/               # Database models
│   ├── database/             # Database connection and utilities
│   └── config/               # Configuration files
├── specs/                    # Project specifications
│   ├── <feature>/            # Specifications for each feature
│   │   ├── spec.md           # Feature specification
│   │   ├── plan.md           # Architecture plan
│   │   └── tasks.md          # Implementation tasks
├── .specify/                 # Spec-Kit Plus configuration
├── .qwen/                    # Qwen Code configuration
├── package.json              # Root dependencies and scripts
├── README.md                 # This file
└── QWEN.md                   # Qwen Code rules and guidelines
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- pip
- npm

### Backend Setup
1. Navigate to the backend directory:
```bash
cd phase/
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```
(If requirements.txt doesn't exist, install the required packages manually)

3. Set up environment variables:
Create a `.env` file in the backend directory with the required configurations.

4. Run the backend server:
```bash
uvicorn main:app --reload
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend/
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Copy `.env.example` to `.env.local` and configure the values as needed.

4. Run the development server:
```bash
npm run dev
```

## Usage
Once both the backend and frontend servers are running:

1. Access the frontend at `http://localhost:3000`
2. Access the backend API documentation at `http://localhost:8000/docs`
3. Sign up or log in to access protected features
4. Explore the various features of the application

## Development
### Adding New Features
1. Create a new specification in the `specs/` directory following the pattern:
   ```
   specs/<feature-name>/
   ├── spec.md
   ├── plan.md
   └── tasks.md
   ```
2. Follow the Spec-Kit Plus methodology for defining requirements, architecture, and tasks
3. Implement the feature following the defined tasks

### Environment Variables
Both frontend and backend require environment variables for proper configuration:

#### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

#### Backend (.env)
```
DATABASE_URL=sqlite:///./sql_app.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and all tests pass before submitting.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
If you encounter any issues or have questions, please file an issue in the GitHub repository.