// Initialize Lucide Icons
lucide.createIcons();

// --- TYPEWRITER HERO ANIMATION ---
const typewriterPhrases = [
  "Python Developer",
  "Machine Learning Engineer",
  "Technical Writer",
  "Intelligent Systems Builder",
  "AI Expert"
];

const typewriterEl = document.getElementById("typewriter-text");
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typewriterSpeed = 100;

function type() {
  const currentPhrase = typewriterPhrases[phraseIdx];
  
  if (isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, charIdx - 1);
    charIdx--;
    typewriterSpeed = 50; // faster deletion
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, charIdx + 1);
    charIdx++;
    typewriterSpeed = 100; // standard typing
  }

  // Handle word completion states
  if (!isDeleting && charIdx === currentPhrase.length) {
    isDeleting = true;
    typewriterSpeed = 2000; // Wait 2 seconds at the end of word
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
    typewriterSpeed = 500; // Wait before starting next phrase
  }

  setTimeout(type, typewriterSpeed);
}

// Start typewriter animation
if (typewriterEl) {
  setTimeout(type, 1000);
}


// --- INTERACTIVE CLI TERMINAL ENGINE ---
const terminalHistory = document.getElementById("terminal-history");
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");

const TERMINAL_COMMANDS = {
  help: `Available commands:
  - <span class="accent">about</span>       : Print a brief biography
  - <span class="accent">skills</span>      : List primary technical proficiencies
  - <span class="accent">projects</span>    : List featured software engineering projects
  - <span class="accent">articles</span>    : List published technical write-ups & tutorials
  - <span class="accent">theme [val]</span>  : Switch preset accent theme (green, amber, cyan, purple)
  - <span class="accent">date</span>       : Print current system timestamp
  - <span class="accent">socials</span>    : Print contact details & active profiles
  - <span class="accent">clear</span>      : Clear the console screen`,
  
  about: `I bridge the gap between complex technical concepts and clear communication, while building intelligent systems that solve real-world problems through machine learning and Python development.
  
I'm a multifaceted professional combining technical writing expertise, machine learning engineering, and Python development to create comprehensive solutions. With a passion for making complex technical concepts accessible, I specialize in documenting AI/ML systems, building intelligent applications, and developing robust Python solutions.`,
  
  skills: `Primary Technical Competencies:
  • <span class="accent">Applied AI & ML</span>      : LLM Fine-Tuning (LoRA/QLoRA), RAG Pipelines, Custom Deep Learning, Transformers, Vector DBs
  • <span class="accent">MLOps & Infrastructure</span>: Triton Inference Server, distributed GPU runs, MLflow, Kubernetes, FastAPI APIs, Docker
  • <span class="accent">Technical Writing</span>    : API Docs (REST/GraphQL/SDKs), Docs-as-Code (Markdown/RST), Information Architecture, Diagrams
  • <span class="accent">AI/ML Docs Special</span>   : Model Cards & Datasheets, MLOps Runbooks & Playbooks, Research Translation, ML Tooling DX`,
  
  projects: `Featured Projects:
  1. <span class="accent">Exam System with Django & Permit.io</span> (RBAC, Django, PostgreSQL)
     -> https://github.com/Tiioluwani/exam-system
  2. <span class="accent">AI Video Avatar with Simli</span> (OpenAI, Simli, JS)
     -> https://github.com/Tiioluwani/Simli-project
  3. <span class="accent">QA System with Torch & Comet</span> (PyTorch, Comet LLM)
     -> https://github.com/Tiioluwani/Q_A_System
  4. <span class="accent">Emergency Alert System</span> (Flask, Twilio Programmable Voice)
     -> https://github.com/Tiioluwani/Emergency_notification_system`,

  articles: `Top Published Technical Writing:
  • <span class="accent">Graph Algorithms in Python: BFS, DFS, and Beyond</span>
    -> https://www.freecodecamp.org/news/graph-algorithms-in-python-bfs-dfs-and-beyond/
  • <span class="accent">Deep Reinforcement Learning in Natural Language Understanding</span>
    -> https://www.freecodecamp.org/news/deep-reinforcement-learning-in-natural-language-understanding/
  • <span class="accent">Building a Secure Online Exam System with Django and Permit.io</span>
    -> https://tioluwanioyedele542.medium.com/building-a-secure-online-exam-system-with-django-and-permit-io-94833a14d880`,
  
  socials: `Contact channels & profiles:
  • <span class="accent">Email</span>    : tioluwanioyedele542@gmail.com
  • <span class="accent">GitHub</span>   : https://github.com/Tiioluwani
  • <span class="accent">LinkedIn</span> : https://linkedin.com/in/tioluwani-oyedele`,
  
  date: () => new Date().toString()
};

if (terminalInput) {
  terminalInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      const value = terminalInput.value.trim();
      const parts = value.toLowerCase().split(" ");
      const cmd = parts[0];
      const arg = parts[1];
      
      // Echo input line
      const echoLine = document.createElement("div");
      echoLine.className = "terminal-line";
      echoLine.innerHTML = `<span class="terminal-prompt">tioluwani@portfolio:~$</span> ${value}`;
      terminalHistory.appendChild(echoLine);

      if (cmd) {
        if (cmd === "clear") {
          terminalHistory.innerHTML = "";
        } else if (cmd === "theme") {
          const validThemes = ["green", "amber", "cyan", "purple"];
          if (validThemes.includes(arg)) {
            document.body.setAttribute("data-theme", arg);
            
            const responseLine = document.createElement("div");
            responseLine.className = "terminal-line output accent";
            responseLine.textContent = `Applied accent theme: [${arg}] successfully.`;
            terminalHistory.appendChild(responseLine);
          } else {
            const responseLine = document.createElement("div");
            responseLine.className = "terminal-line output";
            responseLine.innerHTML = `Usage: <span class="accent">theme [green/amber/cyan/purple]</span>. Current: <span class="accent">${document.body.getAttribute("data-theme") || "green"}</span>.`;
            terminalHistory.appendChild(responseLine);
          }
        } else if (TERMINAL_COMMANDS.hasOwnProperty(cmd)) {
          const handler = TERMINAL_COMMANDS[cmd];
          const responseLine = document.createElement("div");
          responseLine.className = "terminal-line output";
          responseLine.innerHTML = typeof handler === "function" ? handler() : handler;
          terminalHistory.appendChild(responseLine);
        } else {
          // Unknown command
          const responseLine = document.createElement("div");
          responseLine.className = "terminal-line output";
          responseLine.innerHTML = `bash: command not found: <span class="accent">${cmd}</span>. Type <span class="accent">help</span> for guidelines.`;
          terminalHistory.appendChild(responseLine);
        }
      }
      
      // Clear input and focus
      terminalInput.value = "";
      
      // Auto scroll terminal to bottom
      setTimeout(() => {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }, 50);
    }
  });
}


// --- VIM FOOTER & MODES MANAGEMENT ---
const vimModeEl = document.getElementById("vim-mode");

function updateVimMode(mode, className) {
  if (vimModeEl) {
    vimModeEl.textContent = mode.toUpperCase();
    vimModeEl.className = `vim-mode ${className}`;
  }
}

// Event Listeners for INSERT Mode (Focusing input fields via delegation)
document.addEventListener("focusin", (e) => {
  if (e.target.matches("input, textarea")) {
    updateVimMode("insert", "insert");
  }
});
document.addEventListener("focusout", (e) => {
  if (e.target.matches("input, textarea")) {
    updateVimMode("normal", "normal");
  }
});

// Event Listeners for VISUAL Mode (Hovering clickable elements via delegation)
document.addEventListener("mouseover", (e) => {
  const targetCard = e.target.closest(".glow-card, .article-row, .filter-tag, .btn, .btn-load-more, .contact-item");
  if (targetCard) {
    updateVimMode("visual", "visual");
  }
});
document.addEventListener("mouseout", (e) => {
  const targetCard = e.target.closest(".glow-card, .article-row, .filter-tag, .btn, .btn-load-more, .contact-item");
  if (targetCard) {
    updateVimMode("normal", "normal");
  }
});


// --- REAL-TIME SCROLL DEPTH TRACKING ---
const scrollDepthEl = document.getElementById("vim-scroll");

window.addEventListener("scroll", () => {
  if (scrollDepthEl) {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight <= 0) {
      scrollDepthEl.textContent = "Top";
      return;
    }
    
    const percentage = Math.min(100, Math.max(0, Math.round((scrollTop / docHeight) * 100)));
    
    if (percentage === 0) {
      scrollDepthEl.textContent = "Top";
    } else if (percentage >= 99) {
      scrollDepthEl.textContent = "Bot";
    } else {
      scrollDepthEl.textContent = `${percentage}%`;
    }
  }
});


// --- ACTIVE NAVIGATION SYNCING (INTERSECTION OBSERVER) ---
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const activeSectionBranch = document.getElementById("vim-section");

const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -60% 0px", // triggers when section dominates screen
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const activeId = entry.target.id;
      
      // Update nav link states
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${activeId}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
      
      // Update Vim footer active section branch
      if (activeSectionBranch) {
        activeSectionBranch.textContent = `${activeId} ⎇`;
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));


// --- CURSOR-TRACKING HOVER GLOW CARD EFFECTS ---
const glowCards = document.querySelectorAll(".glow-card");
glowCards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});


// --- CONTACT FORM HANDLER WITH SHELL SIMULATION ---
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    // Simple verification
    if (!name || !email || !message) {
      formStatus.className = "form-status error";
      formStatus.textContent = "$ send-mail: Failed. Form fields cannot be blank.";
      return;
    }
    
    // Set loading state
    formStatus.className = "form-status success";
    formStatus.textContent = "$ send-mail --recipient tioluwani --establishing-connection...";
    
    // Progress sequence simulation
    setTimeout(() => {
      formStatus.textContent = "$ send-mail --secure-tunnel-established. Transmitting packet...";
      
      // Submit via AJAX to Netlify (executed after connection text is set)
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(contactForm)).toString()
      })
      .then((response) => {
        if (response.ok) {
          formStatus.textContent = "$ send-mail: Success! Message transmitted securely.";
          // Clear form
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
        } else {
          formStatus.className = "form-status error";
          formStatus.textContent = "$ send-mail: Error. Server responded with a transmission failure.";
        }
      })
      .catch((error) => {
        formStatus.className = "form-status error";
        formStatus.textContent = `$ send-mail: Connection lost. ${error.message || "Unknown network error."}`;
      });
    }, 1000);
  });
}


// --- PREMIUM DYNAMIC ARTICLES BROWSER ENGINE ---
const ARTICLES_DATA = [
  {
    "title": "RHEL AI vs. OpenShift AI: Pros and Cons of Red Hat AI Tools",
    "description": "Compare Red Hat Enterprise Linux AI's simplicity with OpenShift AI's scalability to make an informed decision about Red Hat's AI solutions.",
    "publishedDate": "2025-03-19",
    "tags": ["Machine Learning", "Documentation", "Red Hat", "AI"],
    "link": "https://thenewstack.io/choosing-the-right-red-hat-ai-solution-rhel-ai-vs-openshift-ai/"
  },
  {
    "title": "Address Common Machine Learning Challenges With Managed MLflow",
    "description": "Explore how managed MLflow can simplify machine learning workflows, from experiment tracking to model deployment, and enhance collaboration across teams.",
    "publishedDate": "2024-12-16",
    "tags": ["ML", "MLflow", "Documentation"],
    "link": "https://thenewstack.io/address-common-machine-learning-challenges-with-managed-mlflow/"
  },
  {
    "title": "How to Get Started with Matplotlib – With Code Examples and Visualizations",
    "description": "A comprehensive guide to Matplotlib, including installation, basic plotting, and advanced visualization techniques.",
    "publishedDate": "2024-10-07",
    "tags": ["Python", "Matplotlib", "Data Visualization"],
    "link": "https://www.freecodecamp.org/news/getting-started-with-matplotlib/"
  },
  {
    "title": "How Do Generative Models Work in Deep Learning? Generative Models For Data Augmentation Explained",
    "description": "An in-depth exploration of generative models in deep learning, focusing on their architecture, training processes, and applications in data augmentation.",
    "publishedDate": "2024-07-26",
    "tags": ["Python", "Deep Learning", "Generative Models"],
    "link": "https://www.freecodecamp.org/news/generative-models-for-data-augmentation/"
  },
  {
    "title": "How Does Knowledge Distillation Work in Deep Learning Models?",
    "description": "A comprehensive guide to knowledge distillation in deep learning, covering its principles, techniques, and applications for model compression and transfer learning.",
    "publishedDate": "2024-07-09",
    "tags": ["Python", "Deep Learning", "Knowledge Distillation"],
    "link": "https://www.freecodecamp.org/news/knowledge-distillation-in-deep-learning-models/"
  },
  {
    "title": "What are Attention Mechanisms in Deep Learning?",
    "description": "An in-depth exploration of attention mechanisms in deep learning, focusing on their architecture, training processes, and applications in natural language processing.",
    "publishedDate": "2024-10-07",
    "tags": ["Python", "Deep Learning", "Attention Mechanisms"],
    "link": "https://www.freecodecamp.org/news/what-are-attention-mechanisms-in-deep-learning/"
  },
  {
    "title": "Building a Secure Online Exam System with Django and Permit.io",
    "description": "A Python tutorial on building an online exam system with Django and Permit.io",
    "publishedDate": "2025-06-03",
    "tags": ["Python", "Tutorial", "Django", "Permit.io"],
    "link": "https://tioluwanioyedele542.medium.com/building-a-secure-online-exam-system-with-django-and-permit-io-94833a14d880"
  },
  {
    "title": "The Power of NLP for Market Research: How Hugging Face Can Drive Data-Driven Decisions",
    "description": "An in-depth exploration of how Hugging Face's NLP tools can be leveraged for market research, including practical examples and case studies.",
    "publishedDate": "2024-10-09",
    "tags": ["Python", "NLP", "Hugging Face", "Market Research"],
    "link": "https://tioluwanioyedele542.medium.com/the-power-of-nlp-for-market-research-how-hugging-face-can-drive-data-driven-decisions-34672f16a9e8"
  },
  {
    "title": "Understanding Word2Vec and Word Embeddings",
    "description": "A comprehensive guide to Word2Vec and word embeddings, including their architecture, training processes, and applications in natural language processing.",
    "publishedDate": "2024-07-18",
    "tags": ["Python", "NLP", "Word2Vec", "Word Embeddings"],
    "link": "https://python.plainenglish.io/understanding-word2vec-and-word-embeddings-0cfe723f69b9"
  },
  {
    "title": "Building a System with Confidence Scores Using Comet LLM",
    "description": "A comprehensive guide to building a system with confidence scores using Comet LLM, covering model training, evaluation, and deployment.",
    "publishedDate": "2024-03-19",
    "tags": ["Python", "Machine Learning", "Comet LLM"],
    "link": "https://python.plainenglish.io/building-a-system-with-confidence-scores-using-comet-llm-5961dd741c30"
  },
  {
    "title": "Exploring the Power of Language Models: A Guide to Comet LLM",
    "description": "A comprehensive guide to exploring the capabilities and applications of Comet LLM, covering model training, evaluation, and deployment.",
    "publishedDate": "2024-03-19",
    "tags": ["Python", "Machine Learning", "Comet LLM"],
    "link": "https://python.plainenglish.io/exploring-the-power-of-language-models-a-guide-to-comet-llm-56b51736a0aa"
  },
  {
    "title": "Initiating a Voice Call in Flask with Twilio Programmable Voice",
    "description": "A comprehensive guide to initiating a voice call in a Flask application using Twilio Programmable Voice.",
    "publishedDate": "2024-03-19",
    "tags": ["Python", "Flask", "Twilio"],
    "link": "https://python.plainenglish.io/initiating-a-voice-call-in-flask-with-twilio-programmable-voice-543a69003792"
  },
  {
    "title": "Building a Linear Regression Model with Comet. ML",
    "description": "A comprehensive guide to building a linear regression model with Comet ML, covering model training, evaluation, and deployment.",
    "publishedDate": "2024-03-18",
    "tags": ["Python", "Machine Learning", "Comet ML"],
    "link": "https://python.plainenglish.io/building-a-linear-regression-model-with-comet-ml-7bb114f2b4a7"
  },
  {
    "title": "Enhancing Model Debugging with Comet.ml",
    "description": "A comprehensive guide to enhancing model debugging with Comet.ml, covering advanced tracking, visualization, and collaboration features.",
    "publishedDate": "2024-03-18",
    "tags": ["Python", "Machine Learning", "Comet.ml"],
    "link": "https://python.plainenglish.io/enhancing-model-debugging-with-comet-ml-4d5f7561902f"
  },
  {
    "title": "Top 5 Static Code Analysis Tools Every Python Developer Should Know",
    "description": "A comprehensive guide to the top 5 static code analysis tools every Python developer should know, covering installation, usage, and best practices.",
    "publishedDate": "2024-01-03",
    "tags": ["Python", "Development Tools", "Static Code Analysis"],
    "link": "https://python.plainenglish.io/top-5-static-code-analysis-tools-every-python-developer-should-know-5bb5c315c557"
  },
  {
    "title": "Tracking Your Naive Bayes Model Using Comet",
    "description": "A comprehensive guide to tracking your Naive Bayes model using Comet, covering model training, evaluation, and deployment.",
    "publishedDate": "2023-11-15",
    "tags": ["Python", "Machine Learning", "Comet LLM"],
    "link": "https://heartbeat.comet.ml/tracking-your-naive-bayes-model-using-comet-f40df097bba5"
  },
  {
    "title": "DevOps for Machine Learning: Bridging the Gap With MLOps",
    "description": "A comprehensive guide to implementing MLOps practices in your machine learning projects, covering best practices, tools, and workflows.",
    "publishedDate": "2023-10-05",
    "tags": ["Python", "Machine Learning", "MLOps"],
    "link": "https://blog.stackademic.com/devops-for-machine-learning-bridging-the-gap-with-mlops-f84a77f4c841"
  },
  {
    "title": "Getting Started With Web Scraping With Python (Beginner’s Guide)",
    "description": "A comprehensive guide to getting started with web scraping using Python, covering libraries, techniques, and best practices.",
    "publishedDate": "2023-10-03",
    "tags": ["Python", "Web Scraping", "Beautiful Soup"],
    "link": "https://python.plainenglish.io/getting-started-with-web-scraping-with-python-beginners-guide-746451b7514f"
  },
  {
    "title": "Deep Reinforcement Learning in Natural Language Understanding",
    "description": "A comprehensive guide to deep reinforcement learning techniques for natural language understanding tasks.",
    "publishedDate": "2025-08-15",
    "tags": ["Python", "Machine Learning", "Deep Learning", "NLP"],
    "link": "https://www.freecodecamp.org/news/deep-reinforcement-learning-in-natural-language-understanding/"
  },
  {
    "title": "Graph Algorithms in Python: BFS, DFS, and Beyond",
    "description": "A comprehensive guide to graph algorithms in Python, covering BFS, DFS, and other advanced techniques.",
    "publishedDate": "2025-09-03",
    "tags": ["Python", "Graph Algorithms", "Data Structures"],
    "link": "https://www.freecodecamp.org/news/graph-algorithms-in-python-bfs-dfs-and-beyond/"
  },
  {
    "title": "How Transformer Models Work for Language Processing",
    "description": "A comprehensive guide to transformer models and their applications in natural language processing.",
    "publishedDate": "2025-09-12",
    "tags": ["Python", "Machine Learning", "Transformers", "NLP"],
    "link": "https://www.freecodecamp.org/news/how-transformer-models-work-for-language-processing/"
  },
  {
    "title": "Common Pitfalls to Avoid When Analyzing and Modeling Data",
    "description": "A comprehensive guide to common pitfalls in data analysis and modeling, covering best practices and strategies for success.",
    "publishedDate": "2025-10-14",
    "tags": ["Python", "Machine Learning", "Data Analysis", "Modeling"],
    "link": "https://www.freecodecamp.org/news/common-pitfalls-to-avoid-when-analyzing-and-modeling-data/"
  },
  {
    "title": "AI in Documentation — Will Developers Rely on Docs or Conversational Assistants?",
    "description": "A comprehensive guide to the role of AI in documentation, exploring the balance between traditional documentation and conversational assistants.",
    "publishedDate": "2025-09-05",
    "tags": ["Python", "Machine Learning", "Documentation", "AI"],
    "link": "https://tioluwanioyedele542.medium.com/ai-in-documentation-will-developers-rely-on-docs-or-conversational-assistants-ddb77b51846a"
  },
  {
    "title": "Data Integration Strategies for Cloud-Based Applications",
    "description": "A comprehensive guide to data integration strategies for cloud-based applications, covering best practices, tools, and techniques.",
    "publishedDate": "2023-09-27",
    "tags": ["Python", "Cloud Computing", "Data Integration"],
    "link": "https://python.plainenglish.io/data-integration-strategies-for-cloud-based-applications-5961dd741c30"
  },
  {
    "title": "Introduction to Regular Expressions In Python",
    "description": "A comprehensive guide to regular expressions in Python, covering syntax, usage, and best practices.",
    "publishedDate": "2023-09-18",
    "tags": ["Python", "Regular Expressions"],
    "link": "https://python.plainenglish.io/introduction-to-regular-expressions-in-python-5961dd741c30"
  },
  {
    "title": "Generative Adversarial Networks (GANs) vs. Deep Reinforcement Learning (DRL)",
    "description": "A comprehensive guide to the differences and similarities between GANs and DRL, covering use cases, advantages, and challenges.",
    "publishedDate": "2023-05-30",
    "tags": ["Python", "Machine Learning", "GANs", "DRL"],
    "link": "https://heartbeat.comet.ml/generative-adversarial-networks-gans-vs-deep-reinforcement-learning-drl-232e772b02a"
  },
  {
    "title": "Principles of MLOps",
    "description": "A comprehensive guide to MLOps principles, covering best practices, tools, and workflows.",
    "publishedDate": "2023-02-01",
    "tags": ["Python", "Machine Learning", "MLOps"],
    "link": "https://heartbeat.comet.ml/principles-of-mlops-c3171587662f"
  },
  {
    "title": "The Logistic Regression",
    "description": "A comprehensive guide to logistic regression in Python, covering theory, implementation, and best practices.",
    "publishedDate": "2022-09-06",
    "tags": ["Python", "Machine Learning", "Classification", "Logistic Regression"],
    "link": "https://heartbeat.comet.ml/the-logistic-regression-506d2c06e3d"
  },
  {
    "title": "8 Awesome Strapi Plugins for Your Corporate Website",
    "description": "A comprehensive guide to 8 awesome Strapi plugins that can enhance your corporate website.",
    "publishedDate": "2022-09-06",
    "tags": ["Strapi", "Plugins", "Corporate website", "Content Management"],
    "link": "https://strapi.io/blog/8-awesome-strapi-plugins-for-your-corporate-website"
  }
];

// Elements
const articlesContainer = document.getElementById("articles-container");

// Format Date nicely
function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// Render dynamic articles list
function renderArticles() {
  if (!articlesContainer) return;

  // Clear container
  articlesContainer.innerHTML = "";

  // Render all articles in a gorgeous direct 3-column grid feed
  ARTICLES_DATA.forEach(art => {
    const card = document.createElement("div");
    card.className = "glow-card project-card article-card";
    
    // Bind inline interactive cursor-tracking hover glow effect
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
    
    const tagsHtml = art.tags.map(t => `<span class="skill-tag">${t}</span>`).join(" ");
    
    card.innerHTML = `
      <div class="glow-card-content" style="height:100%; display:flex; flex-direction:column;">
        <div class="project-meta">
          <span class="skill-tag">${art.tags[0] || 'Guide'}</span>
          <a href="${art.link}" target="_blank" class="project-link-icon">
            <i data-lucide="external-link"></i>
          </a>
        </div>
        <h3 style="margin-top:1.2rem; margin-bottom:0.8rem; font-size:1.25rem; font-weight:600; line-height:1.4;">
          <a href="${art.link}" target="_blank" style="color:var(--text); transition:color 0.2s ease;">
            ${art.title}
          </a>
        </h3>
        <p style="color:var(--text-muted); font-size:0.95rem; line-height:1.5; margin-bottom:1.5rem; flex-grow:1;">
          ${art.description}
        </p>
        <div class="project-tech" style="display:flex; flex-wrap:wrap; gap:6px; margin-top:auto;">
          ${tagsHtml}
        </div>
      </div>
    `;
    
    articlesContainer.appendChild(card);
  });

  // Re-initialize Lucide Icons for newly injected dynamic DOM nodes
  lucide.createIcons();
}

// Initial Boot of the Articles
renderArticles();

