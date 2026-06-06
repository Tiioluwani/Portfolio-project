# Tioluwani Taiwo — Developer Portfolio

A premium, interactive developer portfolio showcasing expertise in **Applied AI Engineering**, **MLOps**, and **Documentation Engineering / DX**. 

Live repository: [github.com/Tiioluwani/Portfolio-project](https://github.com/Tiioluwani/Portfolio-project)

---

## 🚀 Key Features

* **Interactive CLI Terminal Simulator**: A mock command console where visitors can run custom commands (e.g. `about`, `skills`, `projects`, `articles`, `socials`, `clear`, `date`).
* **Real-Time Color Themes**: Switch terminal and portal accents instantly with commands like `theme amber`, `theme cyan`, `theme purple`, or `theme green` to customize the entire color palette.
* **Premium Client-Side Articles Browser**: Displays 29 technical articles dynamically in a responsive, 3-column glassmorphic card grid. Includes live text searching, tag/topic filters, and pagination.
* **Custom Radial-Gradient Hover Glows**: Interactive hover effects where cursor-following halos track the mouse position dynamically over skill cards and article blocks.
* **Vim Footer Modeline Status Bar**: A footer bar replicating the Vim status line, shifting active mode statuses (`NORMAL`, `INSERT`, `VISUAL`) and displaying current page sections and scroll depths dynamically.
* **Secure AJAX Contact Form**: Integrated with **Netlify Forms** for secure, backend-less email handling. Exposes zero API keys or authentication secrets in the public repository.

---

## 🛠️ Tech Stack

* **Structure**: HTML5 (Semantic elements, metadata tags optimized for SEO)
* **Styling**: Vanilla CSS (Tailored variables, custom HSL theme mappings, responsive grids, transitions)
* **Scripting**: Pure JavaScript (ES6+, DOM Event delegation, Intersection Observer API)
* **Icons**: [Lucide Icons](https://lucide.dev/)

---

## 💻 Local Development

To run this project locally without any complex build steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/Tiioluwani/Portfolio-project.git
   cd Portfolio-project
   ```
2. Open `index.html` directly in your browser, or spin up a lightweight development server:
   ```bash
   npx -y http-server
   ```

---

## 🌐 Deploying to Netlify (Forms Activation)

This project is fully pre-configured to utilize **Netlify Forms** for the contact panel:

1. Log in to your [Netlify](https://app.netlify.com) dashboard.
2. Select **Add new site** -> **Import an existing project**.
3. Choose **GitHub**, authorize it, and select the `Portfolio-project` repository.
4. Click **Deploy**. Netlify will automatically detect the HTML setup, host the static files, and activate the contact form interface.
