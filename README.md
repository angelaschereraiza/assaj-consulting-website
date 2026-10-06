# ASSAJ Consulting GmbH Website

Static single-page website for **ASSAJ Consulting GmbH**.

Built with semantic HTML, CSS and vanilla JavaScript.

## Features

- Responsive one-page layout
- Mobile navigation
- German, French and English language switching
- Accessible keyboard navigation and legal dialogs
- SEO meta tags and structured data
- `robots.txt` and `sitemap.xml`
- Lightweight and dependency-free
- Automatic copyright year

## Local preview

```sh
make serve
```

## Deployment

`make deploy` deploys only public website files to the production webroot. Source and project files such as `.git`, `templates`, `.xcf`, `README.md` and `Makefile` are excluded and removed from the webroot if present.

```sh
make deploy
```

For the test environment:

```sh
make deploy_test
```
