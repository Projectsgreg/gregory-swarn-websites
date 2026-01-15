text
# Gregory Swarn Personal Brand Ecosystem

Three interconnected websites built with pure HTML, CSS, and JavaScript. One codebase serves three different domains with unique themes.

## Live Websites
| Domain | Purpose | File |
|--------|---------|------|
| `gregoryswarnenterprises.com` | Main Personal Hub | `index.html` |
| `greedforlifeinternational.com` | Finance & Investment | `finance.html` |
| `maximizeforlifeinternational.com` | Health & Performance | `health.html` |

## File Structure
gregory-swarn-websites/
├── index.html
├── finance.html
├── health.html
├── style.css
├── script.js
├── media/
│ ├── greg-1.jpeg
│ ├── greg-2.jpeg
│ ├── greg-3.jpeg
│ ├── greg-4.jpeg
│ ├── greg-5.jpeg
│ ├── greg-6.jpeg
│ ├── greg-7.jpeg
│ ├── greg-8.jpeg
│ ├── greg-9.jpeg
│ ├── greg-10.jpeg
│ ├── greg-11.jpeg
│ ├── greg-12.jpeg
│ ├── greg-13.jpeg
│ └── favicon.ico
├── manifest.json
├── robots.txt
├── sitemap.xml
└── README.md

text

## Theme System
- **Personal Theme**: Navy/Gold (`index.html`)
- **Finance Theme**: Charcoal/Ice Blue (`finance.html`)
- **Health Theme**: Forest Green/Coral (`health.html`)

## Setup & Deployment

### 1. GitHub Pages Hosting
1. Go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Under **Branch**, select **main** and folder **/(root)**
4. Click **Save**
5. Site goes live at: `https://YOUR-GITHUB-USERNAME.github.io/gregory-swarn-websites/`

### 2. Connect Porkbun Domains
For EACH of your three domains, add these DNS records in Porkbun:

**A Records (4 records - same for all domains):**
@ → 185.199.108.153
@ → 185.199.109.153
@ → 185.199.110.153
@ → 185.199.111.153

text

**CNAME Record (1 record):**
www → YOUR-GITHUB-USERNAME.github.io.

text
*(Note: Replace YOUR-GITHUB-USERNAME with your actual GitHub username. The trailing dot . is required.)*

**In GitHub Pages Settings:**
Add each custom domain in the **Custom domain** field one at a time.

## Form Configuration
Forms use Formspree.io. You must:
1. Go to [Formspree.io](https://formspree.io) and create 3 forms (Main, Finance, Health)
2. In `script.js`, find line 4-8 and update with your actual Formspree URLs:
```javascript
const CONFIG = {
    formspree: {
        main: 'https://formspree.io/f/YOUR_MAIN_FORM_ID',
        finance: 'https://formspree.io/f/YOUR_FINANCE_FORM_ID',
        health: 'https://formspree.io/f/YOUR_HEALTH_FORM_ID'
    }
};
