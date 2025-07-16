# 12. Contributing

Thank you for your interest in contributing to the NamanMahi.in project! To ensure a smooth and collaborative process, please follow these guidelines.

## Code Style

- **Formatting**: This project uses Prettier for code formatting. Please ensure you run the formatter before committing your changes. Most IDEs can be configured to do this automatically on save.
- **Linting**: We use ESLint to catch common errors and enforce code style. Run `npm run lint` to check for any issues.
- **TypeScript**: Adhere to the TypeScript best practices established in the codebase. Use strong types and avoid using `any` whenever possible.

## Commit Messages

Please follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification for your commit messages. This helps in creating a clear and readable commit history and allows for automated changelog generation.

**Format**: `<type>(<scope>): <subject>`

- **Types**: `feat` (new feature), `fix` (bug fix), `docs` (documentation), `style` (formatting), `refactor`, `test`, `chore` (build process, etc.).
- **Scope** (optional): The part of the application affected (e.g., `api`, `admin`, `blog`, `deps`).

**Examples**:
- `feat(blog): add rich text editor to blog creation page`
- `fix(api): resolve issue with saving chat replies`
- `docs(readme): update setup instructions`

## Branching Strategy

- **`main`**: This branch represents the stable, production-ready code. Direct pushes are restricted.
- **Feature Branches**: All new work should be done on a feature branch.
  - Create a branch from `main`: `git checkout -b <type>/<short-description>`
  - Example: `git checkout -b feat/user-profile-page`

## Pull Request (PR) Process

1.  **Create a PR**: Once your feature or fix is complete, create a Pull Request from your feature branch to the `main` branch.
2.  **Title and Description**: Use a clear and descriptive title for your PR. The description should explain *what* the change is and *why* it's being made. If it resolves an existing issue, link to it (e.g., "Closes #123").
3.  **Review**: At least one other team member must review and approve the PR. Address any feedback or requested changes.
4.  **Merging**: Once approved, the PR can be merged into the `main` branch. Use a "Squash and Merge" to keep the commit history on `main` clean and concise.
5.  **Delete Branch**: After merging, delete the feature branch.

## Reporting Bugs

- Use the issue tracker to report any bugs.
- Provide a clear title and a detailed description, including steps to reproduce the bug and screenshots if possible.
