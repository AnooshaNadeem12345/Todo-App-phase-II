# Data Model: 3D Todo Frontend

## User Entity
- **Fields**:
  - id: Unique identifier for the user
  - email: Email address for authentication
  - name: Display name for the user
  - createdAt: Timestamp when the account was created
  - updatedAt: Timestamp when the account was last updated
  - preferences: Object containing user preferences (theme: dark/light, etc.)

- **Validation Rules**:
  - Email must be a valid email format
  - Name must be between 2 and 50 characters
  - Email must be unique across all users

- **Relationships**:
  - One-to-many relationship with Task entity (one user can have many tasks)

## Task Entity
- **Fields**:
  - id: Unique identifier for the task
  - title: Title of the task (required)
  - description: Detailed description of the task (optional)
  - completed: Boolean indicating if the task is completed (default: false)
  - dueDate: Date when the task is due (optional)
  - createdAt: Timestamp when the task was created
  - updatedAt: Timestamp when the task was last updated
  - userId: Foreign key linking to the user who owns the task

- **Validation Rules**:
  - Title must be between 1 and 200 characters
  - Due date must be a valid date if provided
  - Completed must be a boolean value

- **State Transitions**:
  - Active → Completed: When user marks task as complete
  - Completed → Active: When user unmarks task as complete

- **Relationships**:
  - Many-to-one relationship with User entity (many tasks belong to one user)