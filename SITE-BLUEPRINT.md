# Site Blueprint

This document provides a comprehensive blueprint of your website project, including structure, file/folder purposes, build/deploy flow, and integration points.

---

## Project Structure

```
website-project/
│
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml   # GitHub Actions workflow for Azure Static Web Apps deployment
│
├── ai-platform-baseline.bicep          # Azure infrastructure as code (Bicep)
├── ai-platform-baseline.json           # Bicep compiled template
├── ai-platform-baseline.parameters.json# Bicep parameters
├── deploy-mcp-server-azure-cli.txt     # Azure CLI deployment script
├── main.bicep                          # Main Bicep file
├── main.json                           # Main Bicep compiled template
├── package.json                        # Project metadata, scripts, dependencies (Parcel, serve, etc.)
├── README.md                           # Project documentation and deployment instructions
├── SITE-BLUEPRINT.md                   # (This file) Full project blueprint

│
├── src/                                # Source files for the static site
│   ├── index.html                      # Main HTML entry point
│   ├── favicon.ico                     # Site icon
│   ├── robots.txt                      # Search engine directives
│   ├── _redirects                      # Redirect rules (for Netlify)
│   ├── components/
│   │   └── header.js                   # React header component (for future use)
│   ├── scripts/
│   │   └── main.js                     # Main JavaScript for interactivity
│   └── styles/
│       └── main.css                    # Main stylesheet
│
├── api/                                # Azure Functions (serverless API endpoints)
│   └── hello.js                        # Example HTTP trigger function

```

---

## File/Folder Purposes

- **.github/workflows/azure-static-web-apps.yml**: Automates build and deployment to Azure Static Web Apps on push to main.
- **ai-platform-baseline.bicep/.json/.parameters.json, main.bicep/.json**: Azure infrastructure as code (not directly part of the web app, but for provisioning Azure resources).
- **deploy-mcp-server-azure-cli.txt**: Script for deploying MCP server to Azure.
- **package.json**: Defines project scripts (start, build, test), dependencies (Parcel, serve), and metadata.
- **README.md**: Instructions for local development, deployment (Azure SWA, GitHub Pages, Netlify), and customization.

- **src/**: Contains all static site source files.
  - **index.html**: Main HTML file loaded by browsers.
  - **favicon.ico**: Website icon.
  - **robots.txt**: Tells search engines how to crawl the site.
  - **\_redirects**: Netlify-style redirect rules (not used by Azure SWA).
  - **components/header.js**: React header component (not used in static HTML, but available for future React integration).
  - **scripts/main.js**: Main JavaScript for DOM interactivity.
  - **styles/main.css**: Main CSS for site styling.
- **api/**: Contains Azure Functions for serverless API endpoints.
  - **hello.js**: Example HTTP trigger returning JSON.

---

## Build & Deploy Flow

1. **Local Development**
   - Run `npm start` to launch the Parcel dev server (serves src/index.html).
2. **Build**
   - Run `npm run build` to generate the production build in the `dist/` folder.
3. **Deploy**
   - Push to the `main` branch on GitHub triggers the workflow, which builds and deploys to Azure Static Web Apps.
   - The workflow uses `/src` as the app source and `/dist` as the build output.
4. **API**
   - Any files in `api/` are deployed as Azure Functions endpoints (e.g., `/api/hello`).

---

## Integration Points

- **Azure Static Web Apps**: Handles static site hosting and serverless API endpoints.
- **Parcel**: Bundles and builds the static site from `src/` to `dist/`.
- **GitHub Actions**: Automates build and deployment.
- **Netlify**: Alternative deployment option (not primary for this setup).

---

## Notes

- The workflow is tailored for Parcel. If you use a different build tool, update the `output_location` in `.github/workflows/azure-static-web-apps.yml`.
- The React component in `src/components/header.js` is not used in the static HTML but can be integrated if you migrate to a React-based SPA.
- The `_redirects` file is for Netlify and is ignored by Azure SWA.
- Infrastructure files (Bicep, CLI scripts) are for Azure resource provisioning and not part of the static site itself.

---

© 2025 Larry Bol
