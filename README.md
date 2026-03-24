# Microsoft Fabric Best Practices Guide

A comprehensive, interactive documentation site covering architecture, governance, networking, best practices, operations, and emerging capabilities for Microsoft Fabric.

🌐 **Live Site:** [fabric.diazlabs.xyz](https://fabric.diazlabs.xyz)

## 📖 What's Inside

| Page | Description |
|------|-------------|
| **Home** | Guide overview, role-based journeys, architecture wizard, readiness quiz |
| **Architecture** | Core architecture, OneLake, medallion pattern, real-time intelligence |
| **Governance & Security** | Purview integration, endorsement, RLS/CLS, workspace roles |
| **Networking** | Zero-trust, private links, managed VNets, VNet gateways, trusted access |
| **Best Practices** | Lakehouse vs. warehouse, Spark optimization, Power BI Direct Lake |
| **Operations** | CI/CD, capacity planning, cost optimization, migration strategies, sizing |
| **Data Mesh** | Domain-oriented architecture, data products, federated governance |
| **Fabric IQ** | AI agents, ontology, real-time operational intelligence |
| **Getting Started** | Interactive checklist with export to Markdown/PDF |

## ✨ Interactive Features

- 🌙 **Dark Mode** — toggle with persistence
- 🌐 **Spanish Translation** — one-click language toggle
- 📊 **Capacity Calculator** — estimate CU requirements and costs
- 🧭 **Architecture Decision Wizard** — guided questionnaire for architecture choices
- 🔄 **Migration Path Recommender** — platform-specific migration guidance
- ✅ **Readiness Quiz** — 10-question self-assessment
- 🔖 **Section Bookmarks** — save and revisit sections
- 📋 **Checklist Export** — download as Markdown or print to PDF
- 📖 **Reading Progress** — tracks your progress across pages

## 🛠️ Tech Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks, no build step)
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions (auto-deploy on push to `main`)

## 📁 Project Structure

```
├── index.html              # Home page
├── architecture.html       # Architecture & patterns
├── governance.html         # Governance & security
├── networking.html         # Network security
├── best-practices.html     # Engineering best practices
├── operations.html         # Operations & costs
├── data-mesh.html          # Data mesh architecture
├── fabric-iq.html          # Fabric IQ & AI agents
├── checklist.html          # Getting started checklist
├── staticwebapp.config.json # Azure SWA configuration
├── css/
│   └── styles.css          # All styles (inc. dark mode)
└── js/
    ├── nav.js              # Shared navigation & sidebar
    ├── main.js             # Core interactions
    └── features.js         # Interactive features
```

## 🚀 Local Development

No build step needed. Just open `index.html` in a browser, or serve locally:

```bash
npx serve .
```

## 📦 Deployment

Pushes to `main` auto-deploy to Azure Static Web Apps via GitHub Actions.

To deploy manually:
```bash
npm install -g @azure/static-web-apps-cli
swa deploy . --deployment-token "YOUR_TOKEN" --env production
```

## 📄 License

This project is for internal reference and educational purposes.
