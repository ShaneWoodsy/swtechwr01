# 🚀 Shane Woods | Technical Writing Portfolio & Developer Portal

Welcome to the source repository for my professional technical writing portfolio. This site is built using a decentralized, Git-based **Docs-as-Code** model with Docusaurus, React, and MDX to showcase my experience in API lifecycle management, automated quality governance, and developer documentation frameworks.

🔗 **Live Portal:** [https://ShaneWoodsy.github.io/swtechwr01/](https://ShaneWoodsy.github.io/swtechwr01/)

---

## 🛠️ Core Project Architecture

This portal houses my professional matrix alongside live, production-grade technical documentation samples:
*   **Documentation Portal Engine:** Docusaurus (React-based static site generator)
*   **Component Architecture:** MDX (Markdown + JSX) for dynamic elements
*   **Automated Quality Governance:** Configured for automated style-guide enforcement pipelines utilizing Vale CLI workflows

### 📁 Portal Directory Structure
*   `src/pages/index.md` — Portfolio landing page and contact endpoints
*   `src/pages/expertise.md` — Core technical proficiencies and professional corporate experience
*   `docs/REST-APIS/` — Production-grade API reference structures (including OpenAPI specifications and user guides)

---

## ⚙️ Technical Toolchain & Prerequisites

To run, modify, or test this portal locally, ensure you have the following installed:
*   **Node.js** (v18.0.0 or higher recommended)
*   **npm** (or your preferred package manager)

---

## 💻 Local Workspace Administration

### 1. Dependency Resolution
Clone the repository, navigate into the directory, and initialize the project dependencies:
```bash
npm install
```
### 2. Local Development Lifecycle
Boot up the local Webpack dev server with live reloading enabled:

```bash
npm start
```
Once initialized, navigate to `http://localhost:3000/repoName/` to review local workspace compilation.

### 3. Production Compilation
Compile the raw Markdown, MDX, and asset directories into a minified, production-ready static HTML/CSS build:

```Bash
npm run build
```
## 🚀 CI/CD Deployment Workflows (GitHub Pages)
This repository utilizes an automated deployment script to build and push production-ready assets straight to the isolated gh-pages branch for hosting:

```Bash
GIT_USER=yourName npm run deploy
```

