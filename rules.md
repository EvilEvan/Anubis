# Project Workflow Rulesets

## 1. The Ephemeral File Principle
To maintain a clean and focused workspace, all temporary files, test reports, and redundant artifacts must be deleted once they have served their purpose. "If it has run its purpose, thank it and bow out."

## 2. Clear Naming Convention
All files and folders should follow a consistent and descriptive naming convention. This ensures clarity and quick identification.
**Format:** `YYYY-MM-DD-[Feature]-[Creator]-[Version].ext`
**Example:** `2025-07-05-Login-Anubis-v1.md`

## 3. Single Source of Truth
Avoid duplicating information. Each piece of data should have a single, authoritative source to prevent conflicts and maintain consistency. For example, all project requirements should reside in a single `requirements.md` file.

## 4. Structured Commit Messages
Adopt a standardized format for git commit messages to create a clear and understandable project history. We will use the Conventional Commits specification.
**Format:** `<type>[optional scope]: <description>`
**Examples:**
- `feat: add user authentication`
- `fix(API): correct data validation issue`
- `docs: update installation guide`

## 5. Task-Oriented Branching
Create a new branch for every new task, feature, or bug fix. Branch names should be descriptive and follow a consistent pattern.
**Format:** `<type>/<short-description>`
**Examples:**
- `feature/add-login-page`
- `bugfix/fix-streaming-error`

## 6. Mandatory Pull Request Reviews
All code changes must be submitted as a pull request and reviewed by at least one other team member before being merged into the main branch. This ensures code quality and shared knowledge.

## 7. Automated Housekeeping
Whenever possible, use scripts, Git hooks, or CI/CD pipelines to automate routine cleanup tasks. This includes removing build artifacts, clearing logs, and archiving old data. 