# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly:

1. **Do not** open a public GitHub issue
2. Email the maintainer or use [GitHub's private vulnerability reporting](https://github.com/Diaz506/fabric-guide/security/advisories/new)
3. Include a description of the vulnerability and steps to reproduce

## Scope

This is a static documentation site with no server-side code, databases, or authentication. Security concerns are primarily related to:

- **Content Security Policy (CSP)** — configured in `staticwebapp.config.json`
- **External resource loading** — scripts, styles, and API calls
- **Client-side storage** — localStorage for preferences (theme, language, bookmarks)

## Security Headers

Security headers are defined in `staticwebapp.config.json` and include a strict Content Security Policy. Any changes to external resources should update the CSP accordingly.
