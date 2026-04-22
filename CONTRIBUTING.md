# Contributing to Microsoft Fabric Best Practices Guide

Thanks for your interest in contributing! This guide is a community resource for Microsoft Fabric best practices.

## How to Contribute

### Reporting Issues

- Use [GitHub Issues](https://github.com/Diaz506/fabric-guide/issues) to report bugs or suggest improvements
- Include screenshots if reporting a visual issue
- Describe the expected vs. actual behavior

### Suggesting Content

- Open an issue describing the topic you'd like covered
- Reference official Microsoft documentation where applicable
- Indicate which page the content belongs on

### Submitting Changes

1. **Fork** the repository
2. **Create a branch** for your changes (`git checkout -b feature/your-feature`)
3. **Make your changes** — this is a static site with no build step, so just edit the HTML/CSS/JS files directly
4. **Test locally** by running `npx serve .` and checking your changes in a browser
5. **Submit a pull request** with a clear description of your changes

### Adding a New Page

1. Create `your-page.html` following the existing section structure
2. Register the page and its sections in the `pageSections` object in `js/nav.js`
3. Add a route in `staticwebapp.config.json`
4. Include the standard script tags with the correct page ID

### Style Guidelines

- Use CSS custom properties (e.g., `var(--bg-primary)`) — never hardcode colors
- Follow the existing HTML patterns for sections, cards, info boxes, and code blocks
- Test both light and dark modes
- Test the Spanish translation toggle if you add new visible text

## Code of Conduct

Be respectful, constructive, and inclusive. We're all here to learn and share knowledge about Microsoft Fabric.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
